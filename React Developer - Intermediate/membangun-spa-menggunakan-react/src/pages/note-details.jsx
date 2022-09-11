import { useContext, useState } from "react";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import {
  Link, useNavigate, useParams, useSearchParams,
} from "react-router-dom";
import { Remarkable } from "remarkable";
import { PageLayout } from "@/components";
import { NotesContext } from "@/app/contexts";
import { NOTE_TITLE_PATTERN } from "@/app/constants";

function NoteDetailsPage() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { noteId } = useParams();
  const { notes, setNotes } = useContext(NotesContext);
  const navigate = useNavigate();

  const data = notes.find(({ id }) => id === noteId);
  const compiledNoteBody = {
    __html: new Remarkable().render(data?.body),
  };

  const handleOnSearch = (value) => {
    if (!value) {
      searchParams.delete("query");
      setSearchParams(searchParams);
      return;
    }

    navigate(`/?query=${value}`);
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    const regex = new RegExp(NOTE_TITLE_PATTERN);

    if (value.length < 0 && !regex.test(value)) return;

    setKeyword(value);
  };

  const handleOnClickIconArchive = () => {
    const filteredNotes = notes.filter(({ id }) => id !== data?.id);

    // put data to last index
    setNotes([
      ...filteredNotes,
      {
        ...data,
        archived: !data.archived,
      }]);
    navigate(data?.archived ? "/archives" : "/");
  };

  const handleOnClickIconTrash = () => {
    setNotes([...notes.filter(({ id }) => id !== data?.id)]);
    navigate("/");
  };

  return (
    <PageLayout
      keyword={keyword}
      onSearch={handleOnSearch}
      onChange={handleOnChange}
      showNavigationButton={false}
      showNavigation={!!data}
      navLink={[
        {
          name: data?.archived ? "move to active" : "add to archive",
          onClick: handleOnClickIconArchive,
          icon: data?.archived ? <BiArchiveOut className="w-5 h-5" /> : <BiArchiveIn className="w-5 h-5" />,
        },
        {
          name: "Delete notes",
          onClick: handleOnClickIconTrash,
          icon: <FiTrash className="icon" />,
        },
      ]}
    >
      {data ? (
        <>
          <h1 className="md:my-4 md:leading-relaxed">{data?.title}</h1>
          <small>{new Date(data?.createdAt).toDateString()}</small>
          <pre
            className="whitespace-pre-wrap font-sans mt-4 md:mt-6 compiled-notes"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={compiledNoteBody}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-6xl lg:text-8xl md:leading-[70px] lg:leading-[120px]">404</h1>
          <p>Notes not found</p>
          <Link to="/" className="button-base button-primary mt-6">
            Back to home
          </Link>
        </div>
      )}
    </PageLayout>
  );
}

export default NoteDetailsPage;

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { NOTE_TITLE_PATTERN } from "@/app/constants";
import { NotesContext } from "@/app/contexts";
import { PageLayout } from "@/components";
import { NoteCard } from "@/components/atoms";

function ArchivePage() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { notes } = useContext(NotesContext);

  const searchKeyword = searchParams.get("query");
  const archivedNotes = notes.filter(({ archived }) => archived);
  const filteredNotes = searchKeyword && archivedNotes
    .filter(({ title }) => title.toLowerCase().includes(searchKeyword.toLowerCase())); // filter active notes based on query

  const handleOnSearch = (value) => {
    if (!value) {
      searchParams.delete("query");
      setSearchParams(searchParams);
      return;
    }

    setSearchParams({ query: value });
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    const regex = new RegExp(NOTE_TITLE_PATTERN);

    if (value.length < 0 && !regex.test(value)) return;

    setKeyword(value);
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) setKeyword(query);
  }, []);

  return (
    <PageLayout
      keyword={keyword}
      onSearch={handleOnSearch}
      onChange={handleOnChange}
      notes={archivedNotes.map(({ title }) => title)}
      showNavigation={!!(archivedNotes.length !== 0)}
      navLink={[
        {
          name: "new Notes",
          path: "/new",
          icon: <FiPlus className="icon" />,
        },
      ]}
    >
      <h1 className="md:my-4 md:leading-relaxed">Archived notes</h1>

      {searchKeyword && (
        filteredNotes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
            {filteredNotes.map(({
              id, title, createdAt, body,
            }) => (
              <NoteCard
                id={id}
                title={title}
                createdAt={createdAt}
                body={body}
                key={title}
              />
            ))}
          </div>
        ) : (
          <p className="py-6 w-full text-center">
            Archived Notes not found
          </p>
        )
      )}

      {!searchKeyword && (
        archivedNotes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
            {archivedNotes.map(({
              id, title, createdAt, body,
            }) => (
              <NoteCard
                id={id}
                title={title}
                createdAt={createdAt}
                body={body}
                key={title}
              />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center w-full">
            Looks like there&rsquo;s no archived notes here, archive some note!
          </p>
        )
      )}
    </PageLayout>
  );
}

export default ArchivePage;

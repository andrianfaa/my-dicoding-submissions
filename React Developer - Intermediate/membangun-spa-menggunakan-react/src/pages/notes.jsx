import { useContext, useEffect, useState } from "react";
import { FiArchive, FiPlus } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { NOTE_TITLE_PATTERN } from "@/app/constants";
import { NotesContext } from "@/app/contexts";
import { PageLayout } from "@/components";
import { NoteCard } from "@/components/atoms";

function Notes() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { notes } = useContext(NotesContext);

  const searchKeyword = searchParams.get("query");
  const activeNotes = notes.filter(({ archived }) => !archived);
  const filteredNotes = searchKeyword && activeNotes
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
      navLink={[
        {
          name: "new Notes",
          path: "/new",
          icon: <FiPlus className="icon" />,
        },
        {
          name: "Archive",
          path: "/archives",
          icon: <FiArchive className="icon" />,
        },
      ]}
    >
      <h1 className="md:my-4 md:leading-relaxed">Active notes</h1>

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
            Notes not found
          </p>
        )
      )}

      {!searchKeyword && (
        activeNotes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
            {activeNotes.map(({
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
            no active notes here, add some notes!
          </p>
        )
      )}
    </PageLayout>
  );
}

export default Notes;

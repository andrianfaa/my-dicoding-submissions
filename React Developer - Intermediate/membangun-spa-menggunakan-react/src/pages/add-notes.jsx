/* eslint-disable jsx-a11y/no-autofocus */
import {
  useContext, useEffect, useRef, useState,
} from "react";
import { FiSave, FiX } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Remarkable } from "remarkable";
import { v4 as uuidv4 } from "uuid";
import { PageLayout } from "@/components";
import { NotesContext, NOTE_BODY_PATTERN, NOTE_TITLE_PATTERN } from "@/app";

function AddNotesPage() {
  const [keyword, setKeyword] = useState("");
  const [notesTitle, setNotesTitle] = useState("");
  const [notesBody, setNotesBody] = useState("");
  const [compiledMode, setMode] = useState(false);
  const [notesBodyScrollHeight, setNotesBodyScrollHeight] = useState(300);
  const [searchParams, setSearchParams] = useSearchParams();

  const { notes, setNotes } = useContext(NotesContext);
  const navigate = useNavigate();
  const notesBodyRef = useRef();

  const compiledNotesBody = {
    __html: new Remarkable().render(notesBody),
  };

  const handleOnSearch = (value) => {
    if (!value) {
      searchParams.delete("query");
      setSearchParams(searchParams);
      return;
    }

    navigate(`/?query=${value}`);
  };

  const handleOnSearchbarChange = (event) => {
    const { value } = event.target;
    const regex = new RegExp(NOTE_TITLE_PATTERN);

    if (value.length < 0 && !regex.test(value)) return;

    setKeyword(value);
  };

  const handleOnChangeNotesTitle = (event) => {
    const { value } = event.target;
    const regex = new RegExp(NOTE_TITLE_PATTERN);

    if (value.length > 0 && !regex.test(value)) return;

    setNotesTitle(value);
  };

  const handleOnChangeNotesBody = (event) => {
    const { value } = event.target;
    const regex = new RegExp(NOTE_BODY_PATTERN);

    if (value.length > 0 && !regex.test(value)) return;

    setNotesBody(value);
  };

  const handleAutoExpand = (event) => {
    const { key } = event;

    if (key.toLowerCase() === "enter" && notesBodyRef.current) {
      setNotesBodyScrollHeight(notesBodyRef.current.scrollHeight);
    }
  };

  const handleSaveNotes = () => {
    if (!notesTitle) {
      // eslint-disable-next-line no-alert
      window.alert("Note title is required!");
      return;
    }

    const newNotes = {
      id: uuidv4(),
      title: notesTitle,
      body: notesBody,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNotes]);
    navigate("/");
  };

  useEffect(() => {
    if (notesBodyRef.current) {
      setNotesBodyScrollHeight(notesBodyRef.current.scrollHeight);
    }
  }, [notesBody]);

  return (
    <PageLayout
      keyword={keyword}
      onSearch={handleOnSearch}
      onChange={handleOnSearchbarChange}
      showNavigationButton={false}
      navLink={[
        {
          name: "Save",
          onClick: handleSaveNotes,
          icon: <FiSave className="icon" />,
        },
        {
          name: "Cancel",
          onClick: () => navigate("/"),
          icon: <FiX className="icon" />,
        },
      ]}
    >
      <div className="mt-4 md:mt-6">
        <input
          autoFocus
          onChange={handleOnChangeNotesTitle}
          value={notesTitle}
          placeholder="Notes title..."
          className="bg-transparent w-full block text-xl md:text-2xl lg:text-4xl outline-0  pb-4 text-color-headline dark:text-color-headline-dark border-b-[1.5px] border-b-color-border dark:border-b-color-border-dark font-semibold placeholder:font-normal"
        />

        <div className="relative w-full mt-6">
          <div className="w-full mb-6 flex flex-row items-center justify-end">
            <button
              type="button"
              className="button-base w-full md:w-auto"
              onClick={() => setMode(!compiledMode)}
              disabled={notesBody.length <= 0}
            >
              {compiledMode ? "View raw" : "View compiled"}
            </button>
          </div>

          {compiledMode ? (
            <pre
              className="whitespace-pre-wrap compiled-notes bg-color-background-alt dark:bg-color-background-alt-dark font-sans leading-normal p-4 rounded"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={compiledNotesBody}
              title="Compiled mode"
            />
          ) : (
            <textarea
              value={notesBody}
              onChange={handleOnChangeNotesBody}
              onKeyPress={handleAutoExpand}
              ref={notesBodyRef}
              rows="30"
              style={{
                height: `${notesBodyScrollHeight}px`,
              }}
              className="w-full overflow-hidden bg-transparent text-color-base dark:text-color-base-dark"
              placeholder="Notes body..."
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default AddNotesPage;

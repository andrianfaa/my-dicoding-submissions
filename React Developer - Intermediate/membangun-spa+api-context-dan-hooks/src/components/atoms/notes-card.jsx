import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Remarkable } from "remarkable";
import { NoteTypes } from "@/app/types";

export const NotesCard = memo(({
  data,
  skeleton = false,
}) => {
  if (skeleton) {
    return (
      <div id="skeleton" className="w-full no-underline border border-color-border dark:border-color-border-dark rounded p-4">
        <div className="block h-8 mb-2 bg-color-background-alt dark:bg-color-background-alt-dark rounded animate-pulse" />
        <div className="block w-1/3 h-4 mb-4 bg-color-background-alt dark:bg-color-background-alt-dark rounded animate-pulse" />
        <div className="flex flex-col justify-start">
          {Array.from([1, 2, 3, 4, 5]).map((item) => (
            <div className={`${item === 5 ? "w-2/3" : "w-full"} h-5 bg-color-background-alt dark:bg-color-background-alt-dark animate-pulse not-last:mb-2 rounded`} key={item} />
          ))}
        </div>
      </div>
    );
  }

  const {
    id, title, createdAt, body,
  } = data;
  const date = new Date(createdAt).toDateString();
  const renderBody = {
    __html: new Remarkable().render(body),
  };

  return (
    <Link to={`/note/${id}`} className="w-full no-underline border border-color-border dark:border-color-border-dark rounded p-4 hover:border-color-border-active dark:hover:border-color-border-dark-active" id={`note-${id}`}>
      <span className="block text-lg mb-2 text-color-headline dark:text-color-headline-dark">{title}</span>
      <small className="font-sans text-current block mb-4">{date}</small>
      <pre
        className="whitespace-pre-wrap compiled-notes line-clamp-5 font-sans"
        dangerouslySetInnerHTML={renderBody}
      />
    </Link>
  );
});

NotesCard.propTypes = {
  data: NoteTypes,
  skeleton: PropTypes.bool,
};

import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Remarkable } from "remarkable";

export const NoteCard = memo(({
  title,
  createdAt,
  body,
  id,
}) => {
  const compiledBody = {
    __html: new Remarkable().render(body),
  };

  return (
    <Link to={`/note/${id}`} className="transition-all duration-200 ease-in-out p-4 rounded border-default border-color-border dark:border-color-border-dark hover:bg-color-background-alt dark:hover:bg-color-background-alt-dark">
      <p className="block text-xl font-semibold text-color-headline dark:text-color-headline-dark">{title}</p>
      <small>{new Date(createdAt).toDateString()}</small>
      <pre
        className="line-clamp-5 leading-normal whitespace-pre-wrap font-sans mt-3 compiled-notes"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={compiledBody}
      />
    </Link>
  );
});

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

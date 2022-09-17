/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import { NotesTypes } from "@/app/types";
import { NotesCard } from "@/components/atoms";

export function NotesContainer({
  notes, isLoading = false, noNotesText, query, searchNotFoundText,
}) {
  const filteredNotes = query && notes.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));

  return (isLoading) ? (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from([1, 2, 3, 4]).map((item) => <NotesCard skeleton key={item} />)}
    </div>
  ) : (
    <div>
      {query && ((filteredNotes.length > 0) ? (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNotes.map((item) => (
            <NotesCard data={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="text-center h-50vh flex items-center justify-center">
          {searchNotFoundText}
        </div>
      ))}

      {!query && ((notes && notes.length > 0) ? (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((item) => (
            <NotesCard data={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="text-center h-50vh flex items-center justify-center">
          {noNotesText}
        </div>
      ))}
    </div>
  );
}

NotesContainer.propTypes = {
  notes: NotesTypes,
  isLoading: PropTypes.bool,
  noNotesText: PropTypes.string,
  query: PropTypes.string,
  searchNotFoundText: PropTypes.string,
};

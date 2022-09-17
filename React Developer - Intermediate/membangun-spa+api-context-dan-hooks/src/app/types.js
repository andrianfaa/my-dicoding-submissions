import PropTypes from "prop-types";

export const AuthTypes = PropTypes.exact({
  user: PropTypes.objectOf(PropTypes.string),
  token: PropTypes.string,
});

export const NavigationLinkTypes = PropTypes.arrayOf(PropTypes.exact({
  name: PropTypes.string,
  path: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
}));

export const NoteTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  owner: PropTypes.string.isRequired,
});

export const NotesTypes = PropTypes.arrayOf(NoteTypes);

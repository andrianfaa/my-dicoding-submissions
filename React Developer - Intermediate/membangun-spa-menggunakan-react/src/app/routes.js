// Pages
import AddNotesPage from "@/pages/add-notes";
import ArchivePage from "@/pages/archive-page";
import NoteDetailsPage from "@/pages/note-details";
import Notes from "@/pages/notes";
import Error404Page from "../pages/404-page";

export const AppRoutes = [
  {
    path: "/",
    routes: [
      {
        path: "/",
        element: Notes,
      },
      {
        path: "/new",
        element: AddNotesPage,
      },
      {
        path: "/archives",
        element: ArchivePage,
      },
    ],
  },
  {
    path: "/note",
    routes: [
      // to handle trailing slash in path /note
      // example: /note/
      {
        path: "",
        element: NoteDetailsPage,
      },
      {
        path: ":noteId",
        element: NoteDetailsPage,
      },
    ],
  },
  {
    path: "*",
    element: Error404Page,
  },
];

// Components for public route
import LoginPage from "@/pages/public/login";
import RegisterPage from "@/pages/public/register";
// Components for private route
import NotesPage from "@/pages/private/notes";
import ArchivePage from "@/pages/private/archive";
import NoteDetailsPage from "@/pages/private/note-details";
import AddNotePage from "../pages/private/add-note";

export const PublicRoute = [
  {
    name: "Login",
    path: "/",
    element: LoginPage,
  },
  {
    name: "Register",
    path: "/register",
    element: RegisterPage,
  },
];

export const PrivateRoute = [
  {
    name: "Notes",
    path: "/",
    element: NotesPage,
  },
  {
    name: "Archive",
    path: "/archive",
    element: ArchivePage,
  },
  {
    name: "Note Details",
    path: "/note/:id",
    element: NoteDetailsPage,
  },
  {
    name: "Add Notes",
    path: "/new",
    element: AddNotePage,
  },
];

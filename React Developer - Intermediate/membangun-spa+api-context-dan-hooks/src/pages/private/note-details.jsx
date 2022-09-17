import { useContext, useEffect, useState } from "react";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import {
  Link, useNavigate, useParams,
} from "react-router-dom";
import { Remarkable } from "remarkable";
import { AuthContext, LanguageContext } from "@/app/contexts";
import { PageLayout } from "@/components";
import { useNotyf } from "@/hooks";
import ErrorPage from "@/pages/error-page";
import {
  archiveNote, getSingleNote, unarchiveNote, deleteNote,
} from "@/services";
import { LocalStorage } from "@/utils";
import { localize } from "../../app/localize";
import { ModalDelete } from "../../components/molecules/modal-delete";

export default function NoteDetails() {
  const { id } = useParams();
  const notyf = useNotyf();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);

  const [notes, setNotes] = useState({});
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingArchive, setLoadingArchive] = useState(false);
  const [isLoadingDeleteNote, setLoadingDeleteNote] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);

  const page = localize[lang].pages.noteDetails;
  const compiledBody = {
    __html: new Remarkable().render(notes?.body ?? ""),
  };

  const handleOnClickArchive = async () => {
    setLoadingArchive(true);

    const {
      error, message, status,
    } = notes?.archived
      ? (await unarchiveNote(id, { token: auth.token }))
      : (await archiveNote(id, { token: auth.token }));

    if (!error && status === 200) {
      setNotes((prevState) => ({
        ...prevState,
        archived: !prevState.archived ?? false,
      }));
    }

    if (error) {
      notyf.error(message);
    } else {
      notyf.success(message);
    }

    setLoadingArchive(false);
  };

  const handleDeleteNote = async () => {
    setLoadingDeleteNote(true);

    await deleteNote(id, { token: auth.token })
      .then((res) => {
        if (!res.error) {
          notyf.success(res.message);
          navigate("/");
        }

        if (res.error && res.status === 401) {
          LocalStorage.remove("user");
          LocalStorage.remove("token");

          setAuth((prevState) => ({
            ...prevState,
            user: null,
            token: null,
          }));
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          LocalStorage.remove("user");
          LocalStorage.remove("token");

          setAuth((prevState) => ({
            ...prevState,
            user: null,
            token: null,
          }));
        }
      })
      .finally(() => setLoadingDeleteNote(false));
  };

  async function getNoteDetails() {
    await getSingleNote(id, { token: auth.token })
      .then((res) => {
        if (!res.error) {
          setNotes((prevState) => ({
            ...prevState,
            ...res.data.data,
          }));
        }

        if (res.error && res.status === 403) {
          setShowErrorPage(true);
        }

        if (res.error && res.status === 401) {
          LocalStorage.remove("user");
          LocalStorage.remove("token");

          setAuth((prevState) => ({
            ...prevState,
            user: null,
            token: null,
          }));
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          LocalStorage.remove("token");
          LocalStorage.remove("user");
          setAuth((prevState) => ({
            ...prevState,
            token: null,
            user: null,
          }));
        }

        setShowErrorPage(true);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!auth.token) return;

    getNoteDetails();
  }, []);

  if (showErrorPage) {
    return (
      <ErrorPage
        lang={lang}
        text={lang === "en" ? "Notes not found" : "Notes tidak ditemukan"}
      />
    );
  }

  return (
    <PageLayout
      showNavigation={!isLoading}
      showNavigationButton={false}
      wrapperClassName="container pt-24 md:pt-28"
      navigationLink={[
        {
          name: notes?.archived ? "Move to Active" : "Move to Archive",
          onClick: handleOnClickArchive,
          icon: notes?.archived ? <MdOutlineUnarchive className="w-6 h-6" /> : <MdOutlineArchive className="w-6 h-6" />,
          disabled: isLoadingArchive,
        },
        {
          name: "Delete note",
          onClick: () => {
            setModalDelete(true);
          },
          icon: <FiTrash2 className="w-6 h-6 text-red-500 md:text-red-400" />,
          disabled: isLoadingArchive,
        },
      ]}
    >
      {isLoading ? (
        <>
          <div className="flex items-center jusify-start mb-6">
            <div className="h-5 w-28 rounded bg-color-background-alt dark:bg-color-background-alt-dark animate-pulse" />
          </div>
          <div className="w-full h-40px sm:h-50px md:h-60px rounded bg-color-background-alt dark:bg-color-background-alt-dark animate-pulse mb-4 sm:mb-5 md:mb-6" />
          <div className="w-28 h-4 rounded bg-color-background-alt dark:bg-color-background-alt-dark animate-pulse mb-4 sm:mb-5 md:mb-6" />
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((item) => (
            <div key={item} className="w-full h-5 rounded bg-color-background-alt dark:bg-color-background-alt-dark animate-pulse mb-2" />
          ))}
        </>
      ) : notes && (
        <>
          <div className="flex items-center jusify-start mb-6">
            <Link className="no-underline" to={-1}>
              <FiChevronLeft className="inline align-middle w-5 h-5 mr-2" />
              {lang === "en" ? "Back" : "Kembali"}
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-10 font-semibold mb-4 sm:mb-5 md:mb-6">{notes?.title ?? ""}</h1>
          <small className="text-sm md:text-base block mb-4 sm:mb-5 md:mb-6">{new Date(notes?.createdAt).toDateString()}</small>
          <pre
            className="whitespace-pre-wrap w-full overflow-x-auto font-sans compiled-notes"
            dangerouslySetInnerHTML={compiledBody}
          />
        </>
      )}

      <ModalDelete
        state={showModalDelete}
        onClose={() => setModalDelete(false)}
        onClickDelete={handleDeleteNote}
        size="max-w-400px"
        title={page.modalDelete.title}
        subtitle={page.modalDelete.text}
        loadingDelete={isLoadingDeleteNote}
        buttons={[
          {
            text: page.modalDelete.buttons.delete,
            className: "button-danger w-full sm:w-24",
            type: "delete",
          },
          {
            text: page.modalDelete.buttons.cancel,
            className: "w-full sm:w-auto",
          },
        ]}
      />
    </PageLayout>
  );
}

import { useContext, useEffect, useState } from "react";
import { FiArchive, FiPlus } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { REGEX_PATTERNS } from "@/app/constants";
import { AuthContext, LanguageContext } from "@/app/contexts";
import { localize } from "@/app/localize";
import { PageLayout } from "@/components";
import { SearchBar } from "@/components/atoms";
import { NotesContainer } from "@/components/molecules";
import { useForm } from "@/hooks";
import { getActiveNotes } from "@/services";
import { LocalStorage } from "@/utils";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, formState, setFormState } = useForm();

  const { auth, setAuth } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const { token } = auth;

  const page = localize[lang].pages.activeNotes;
  const query = searchParams.get("query");

  const handleSearchNotes = (value) => {
    if (!value) {
      searchParams.delete("query");
      setSearchParams(searchParams);
      return;
    }

    setSearchParams({ query: value });
  };

  async function fetchActiveNotes() {
    await getActiveNotes({ token })
      .then((res) => {
        if (!res.error) {
          setNotes(res.data.data);
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
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!token) return;

    if (query) {
      setFormState("search", query);
    }

    fetchActiveNotes();

    return () => {
      setNotes([]);
    };
  }, []);

  return (
    <PageLayout
      wrapperClassName="container pt-24 md:pt-28"
      showNavigation
      navigationLink={[
        {
          name: "Add new notes",
          path: "/new",
          icon: <FiPlus className="w-6 h-6" />,
        },
        {
          name: "Archive",
          path: "/archive",
          icon: <FiArchive className="w-5 h-5" />,
        },
      ]}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{page.headlineText}</h1>

        <SearchBar
          value={formState.search}
          onSearch={handleSearchNotes}
          inputProps={{
            ...register("search", {
              type: "search",
              pattern: REGEX_PATTERNS.name,
              placeholder: page.searchPlaceholder,
            }),
          }}
        />
      </div>

      <NotesContainer
        notes={notes}
        isLoading={isLoading}
        noNotesText={page.noActiveNotesText}
        searchNotFoundText={page.noNotesText}
        query={query}
      />
    </PageLayout>
  );
}

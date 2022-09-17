/* eslint-disable jsx-a11y/no-autofocus */
import {
  useContext, useEffect, useRef, useState,
} from "react";
import { FiSave, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Remarkable } from "remarkable";
import { REGEX_PATTERNS } from "@/app/constants";
import { AuthContext } from "@/app/contexts";
import { PageLayout } from "@/components";
import { useForm, useNotyf } from "@/hooks";
import { createNote } from "@/services";

export default function AddNote() {
  const [isCompiledMode, setCompiledMode] = useState(false);
  const [isLoadingAddNote, setLoadingAddNote] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(500);
  const { auth } = useContext(AuthContext);

  const { register, formState } = useForm();
  const notyf = useNotyf();
  const notesBodyRef = useRef();
  const navigate = useNavigate();

  const compiledBody = {
    __html: new Remarkable().render(formState?.body),
  };

  const handleOnSave = async () => {
    setLoadingAddNote(true);

    await createNote(formState, { token: auth.token })
      .then((res) => {
        const { error, message } = res;

        if (!error) {
          notyf.success(message);
          navigate("/");
        }
      })
      .catch((error) => {
        notyf.error(error.message);
      })
      .finally(() => setLoadingAddNote(false));
  };

  useEffect(() => {
    if (notesBodyRef.current) {
      setBodyHeight(notesBodyRef.current.scrollHeight);
    }
  }, [formState]);

  return (
    <PageLayout
      showNavigation
      showNavigationButton={false}
      wrapperClassName="container pt-24 md:pt-28"
      navigationLink={[
        {
          name: "Save",
          onClick: handleOnSave,
          icon: <FiSave className="w-6 h-6" />,
          disabled: isLoadingAddNote,
        },
        {
          name: "Cancel",
          onClick: () => navigate("/"),
          icon: <FiX className="w-6 h-6" />,
          disabled: isLoadingAddNote,
        },
      ]}
    >
      <input
        type="text"
        autoFocus
        className="tracking-tighter text-4xl sm:text-5xl md:text-6xl leading-10 font-semibold mb-4 sm:mb-5 md:mb-6 bg-transparent w-full text-color-headline dark:text-color-headline-dark border-b border-b-color-border hover:border-b-color-border-active focus:border-b-color-border-active dark:border-b-color-border-dark dark:hover:border-b-color-border-dark-active dark:focus:border-b-color-border-dark-active pb-4"
        {...register("title", {
          pattern: REGEX_PATTERNS.name,
        })}
      />

      <div className="flex flex-row items-center justify-end mb-6">
        <button
          className="button-base <md:w-full"
          type="button"
          onClick={() => setCompiledMode(!isCompiledMode)}
          disabled={formState?.body?.length === 0}
        >
          {isCompiledMode ? "View raw" : "View compiled"}
        </button>
      </div>

      {isCompiledMode ? (
        <pre
          dangerouslySetInnerHTML={compiledBody}
          className="w-full font-sans leading-normal compiled-notes"
        />
      ) : (
        <textarea
          className="w-full bg-transparent overflow-hidden leading-normal"
          rows={30}
          ref={notesBodyRef}
          style={{
            height: `${bodyHeight}px`,
          }}
          {...register("body")}
        />
      )}
    </PageLayout>
  );
}

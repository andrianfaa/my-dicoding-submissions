import { useContext, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { REGEX_PATTERNS } from "@/app/constants";
import { AuthContext, LanguageContext } from "@/app/contexts";
import { localize } from "@/app/localize";
import { PageLayout } from "@/components";
import { useForm, useNotyf } from "@/hooks";
import { userLogin } from "@/services";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const { formState, register } = useForm();
  const [isLoading, setLoading] = useState(false);
  const notyf = useNotyf();

  const page = localize[lang].pages.login;

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await userLogin({ ...formState })
      .then((res) => {
        const { error, message, data } = res;

        if (!error && data) {
          setAuth((prevState) => ({
            ...prevState,
            token: data.accessToken,
          }));
        } else {
          notyf.error(message);
        }
      })
      .catch((error) => {
        notyf.message(error.message);
      });

    setLoading(false);
  };

  const formInputs = page.formInputs.map((input) => ({
    label: input.label,
    ...register(input.name, {
      type: input.type,
      pattern: REGEX_PATTERNS[input.name] || REGEX_PATTERNS[input.type] || "",
      title: input.title,
    }),
  }));

  return (
    <PageLayout wrapperClassName="container min-h-screen flex items-center justify-center">
      <form onSubmit={handleOnSubmit} className="w-full max-w-500px flex flex-col mx-auto">
        <h1 className="font-semibold text-center text-xl md:text-2xl mb-6 sm:mb-8 px-2">{page.loginText}</h1>

        {formInputs.map((inputProps) => (
          <div id={`group-${inputProps.type}`} key={inputProps.name}>
            <label htmlFor={inputProps.type} className="block mb-2">{inputProps.label}</label>
            <input
              {...inputProps}
              className="input-base mb-2 w-full"
              autoComplete="off"
              placeholder={inputProps.label}
              disabled={isLoading}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="button-base button-primary mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <BiLoaderAlt className="text-base animate-spin" />
          ) : page.buttonText}
        </button>

        <p className="text center mt-4">
          {page.register.text}
          {" "}
          <Link to="/register" className="link-base">
            {page.register.linkText}
          </Link>
        </p>
      </form>
    </PageLayout>
  );
}

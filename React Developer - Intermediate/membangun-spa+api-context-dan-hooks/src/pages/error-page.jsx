import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components";
import { localize } from "../app/localize";

export default function ErrorPage({
  statusCode = 404,
  lang,
  text,
  showBackButton = true,
  buttonText,
  path = "/",
}) {
  const page = localize[lang].pages.errorPage;

  return (
    <PageLayout
      wrapperClassName="min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold mb-4 sm:mb-6 md:mb-8 animate-pulse">{statusCode}</h1>
      <p className="mb-6 w-2/3 text-center">{text || page.text}</p>

      {showBackButton && (
        <Link to={path} className="button-base no-underline">
          {buttonText || page.buttonText}
        </Link>
      )}
    </PageLayout>
  );
}

ErrorPage.propTypes = {
  statusCode: PropTypes.number,
  lang: PropTypes.string.isRequired,
  text: PropTypes.string,
  showBackButton: PropTypes.bool,
  buttonText: PropTypes.string,
  path: PropTypes.string,
};

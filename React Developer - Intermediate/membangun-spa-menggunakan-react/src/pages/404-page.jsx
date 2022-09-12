import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { NOTE_TITLE_PATTERN } from "@/app";
import { PageLayout } from "@/components";

function Error404Page() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOnSearch = (value) => {
    if (!value) {
      searchParams.delete("query");
      setSearchParams(searchParams);
      return;
    }

    navigate(`/?query=${value}`);
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    const regex = new RegExp(NOTE_TITLE_PATTERN);

    if (value.length < 0 && !regex.test(value)) return;

    setKeyword(value);
  };

  return (
    <PageLayout
      keyword={keyword}
      onSearch={handleOnSearch}
      onChange={handleOnChange}
      showNavigation={false}
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-6xl lg:text-8xl md:leading-[70px] lg:leading-[120px]">404</h1>
        <p>Pages not found</p>
        <Link to="/" className="button-base button-primary mt-6">
          Back to home
        </Link>
      </div>
    </PageLayout>
  );
}

export default Error404Page;

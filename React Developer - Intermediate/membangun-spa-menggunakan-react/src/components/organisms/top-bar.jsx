import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/atoms";
import { ModalSetting } from "@/components/molecules";
import { useTheme } from "@/hooks/useTheme";

export function TopBar({
  keyword, onSearch, onChange, notes,
}) {
  const [isShowModal, setIsShowModal] = useState(false);
  const { loadTheme } = useTheme();

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <section className="md:border-b md:border-b-color-border dark:md:border-b-color-border-dark">
      <div className="container flex flex-row items-center justify-between gap-6 h-20 md:h-24">
        <Link
          to="/"
          className="font-bold text-xl tracking-tighter text-color-headline dark:text-color-headline-dark"
          id="brand-name"
        >
          MyNotes.
        </Link>

        <div className="flex flex-row items-center gap-2">
          <SearchBar
            value={keyword}
            onSearch={onSearch}
            onChange={onChange}
            datalist={notes}
          />

          <button
            type="button"
            id="setting"
            title="Setting"
            className="button-base group"
            onClick={() => setIsShowModal(true)}
          >
            <FiSettings className="icon group-active:animate-spin" />
          </button>

          {isShowModal && (
            <ModalSetting open={isShowModal} onClose={() => setIsShowModal(false)} />
          )}
        </div>
      </div>
    </section>
  );
}

TopBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string),
};

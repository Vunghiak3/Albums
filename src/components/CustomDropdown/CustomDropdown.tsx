import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import styles from "./CustomDropdown.module.css";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faInbox, faSearch } from "@fortawesome/free-solid-svg-icons";

interface CustomDropdownProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

export default function CustomDropdown({
  value,
  options,
  onChange,
}: CustomDropdownProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const filteredOptions = options.filter((opt) =>
    `${opt} / page`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.dropdown}>
      <Tippy
        interactive
        visible={open}
        placement={"bottom-start"}
        onClickOutside={() => {
          setOpen(false);
          setSearch("");
          setIsSearching(false);
        }}
        render={(attrs) => (
          <ul className={styles.menu} tabIndex={-1} {...attrs}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt}
                  className={`${styles.item} ${
                    opt === value ? styles.active : ""
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setSearch("");
                    setIsSearching(false);
                  }}
                >
                  {opt} / page
                </li>
              ))
            ) : (
              <li className={styles.noData}>
                <FontAwesomeIcon icon={faInbox} className={styles.icon}/>
                <p>No data</p>
              </li>
            )}
          </ul>
        )}
      >
        <div className={styles.wrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder={`${value} / page`}
            value={search}
            onFocus={() => {
              setIsSearching(true);
              setOpen(true);
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon
            icon={isSearching ? faSearch : faAngleDown}
            className={styles.iconSearch}
            onClick={() => {
              setIsSearching(true);
              setOpen(true);
            }}
          />
        </div>
      </Tippy>
    </div>
  );
}

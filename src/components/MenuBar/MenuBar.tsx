import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MenuBar.module.css";
import { faFileLines, faIdCard } from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function MenuBar({className, onLinkClick }:any) {
  const [active, setActive] = useState(false)

  return (
    <aside className={`${className} ${styles.wrapper} ${active ? styles.active : ""}`}>
      <div className={styles.logo}>
        <Link to={"/"}>
          <img
            src="https://geekup.vn/Icons/geekup-logo-general.svg"
            alt="Logo website"
          />
        </Link>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink
            to={"/albums"}
            onClick={onLinkClick}
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.notActive
            }
          >
            <FontAwesomeIcon icon={faFileLines} className={styles.icon} />
            <p className={active?styles.active:""}>Albums</p>
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink
            to={"/users"}
            onClick={onLinkClick}
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.notActive
            }
          >
            <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
            <p className={active?styles.active:""}>Users</p>
          </NavLink>
        </li>
      </ul>
      {!onLinkClick && (
        <div className={styles.btnToggle}>
          <button onClick={() => setActive(!active)}>
            <FontAwesomeIcon icon={faAngleLeft} className={styles.icon} />
          </button>
        </div>
      )}
    </aside>
  );
}

export default MenuBar;

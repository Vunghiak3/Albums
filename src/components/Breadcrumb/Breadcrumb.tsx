import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav className={styles.breadcrumb}>
      {paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;
        const label = capitalize(segment);

        return (
          <span key={path} className={styles.segment}>
            {!isLast ? (
              <>
                <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
                <Link to={path} className={styles.link}>
                  {label}
                </Link>
                <span className={styles.separator}>/</span>
              </>
            ) : (
              <span className={styles.current}>Show</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;

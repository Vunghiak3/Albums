import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  to: string;
}

function Button({ to, children }: ButtonProps) {
  return (
    <Link to={to} className={styles.button}>
      <button>
        <FontAwesomeIcon icon={faEye} className={styles.icon}/>
        <p className={styles.btnName}>{children}</p>
      </button>
    </Link>
  );
}

export default Button;

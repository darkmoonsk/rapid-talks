import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ type, children, onClick, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      className={styles.pushable}
      onClick={onClick}
      disabled={disabled}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
}

export default Button;

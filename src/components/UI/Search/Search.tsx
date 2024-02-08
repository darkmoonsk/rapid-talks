import styles from "./Search.module.css";

interface SearchProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({placeholder, value, onChange}: SearchProps) {
  return (
    <div 
      className={styles.inputContainer}>
      <input
        type="search"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Search;
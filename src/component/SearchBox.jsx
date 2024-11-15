// helpers
import { createQueryObject } from "../helpers/helper";
// CSS
import styles from "./SearchBox.module.css";
// icons
import { ImSearch } from "react-icons/im";

function SearchBox({ search, setSearch, setQuery }) {
  // handlers
  const searchHandler = () => {
    setQuery((prevQuery) => createQueryObject(prevQuery, { search }));
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
      />
      <button onClick={searchHandler}>
        <ImSearch />
      </button>
    </div>
  );
}

export default SearchBox;

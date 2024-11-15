// constants
import { categories } from "../constants/list";
// helpers
import { createQueryObject } from "../helpers/helper";
// CSS
import styles from "./Sidebar.module.css";
// icons
import { FaListUl } from "react-icons/fa";

function Sidebar({ query, setQuery }) {
  // handlers
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const category = event.target?.innerText.toLowerCase();
    if (tagName !== "LI") return;
    setQuery((prevQuery) => createQueryObject(prevQuery, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={
              category.type.toLowerCase() === query.category
                ? styles.selected
                : null
            }
          >
            {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

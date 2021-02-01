import React, { useState } from "react";
import ReactDOM from "react-dom";
import "fontsource-open-sans";
import "./index.css";
import {
  reloadStorage,
  Category,
  // Location
} from "./models";
import { AppBar, Categories } from "./views";

const App = () => {
  const [index, setIndex] = useState();
  const [title, setTitle] = useState("Categories");
  const [categories, setCategories] = useState(reloadStorage());
  // const [locations, setLocations] = useState();

  return (
    <>
      <AppBar
        index={index}
        title={title}
        create={(text) =>
          Category.create(text) && setCategories(reloadStorage())
        }
        edit={(index, value) =>
          Category.edit(index, value) || setCategories(reloadStorage())
        }
      />
      <div className="grid-container">
        <Categories
          categories={categories}
          // locations={locations}
          current={(index, category) => setIndex(index) || setTitle(category)}
          remove={(element) =>
            Category.remove(element) || setCategories(reloadStorage())
          }
        />
      </div>
      <div className="clear-button">
        <button
          onClick={() => localStorage.clear() || setCategories(reloadStorage())}
        >
          Clear
        </button>
      </div>
    </>
  );
};

module.hot && module.hot.accept();
ReactDOM.render(<App />, document.getElementById("root"));

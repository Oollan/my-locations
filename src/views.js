import React, { createRef, useState, useRef } from "react";

export const AppBar = ({ index, title, create, edit }) => {
  const header = useRef(null);
  const createButton = useRef(null);
  const updateButton = useRef(null);
  let value;

  return (
    <div onClick={() => header.current.focus()} className="app-bar">
      <div className="title">
        <div>{index !== undefined ? "Editing" : title}</div>
        {index !== undefined && <div className="subtitle">{title}</div>}
      </div>
      <input
        ref={header}
        type="text"
        maxLength="25"
        placeholder={
          index !== undefined ? "Click here to edit" : `${title} name`
        }
        onChange={(e) => (value = e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          (index !== undefined
            ? updateButton.current.click()
            : createButton.current.click())
        }
      />
      <div>
        <button
          ref={createButton}
          disabled={index !== undefined}
          onClick={() => {
            value !== undefined && create(value);
            header.current.value = "";
          }}
        >
          Create category
        </button>
        <button
          ref={updateButton}
          disabled={index === undefined}
          onClick={() => {
            value !== undefined && edit(index, value);
            header.current.value = "";
          }}
        >
          Update category
        </button>
      </div>
    </div>
  );
};

export const Categories = ({ categories, locations, current, remove }) => {
  const elRefs = useRef([]);
  const [lastClicked, setLastClicked] = useState();

  elRefs.current.length !== categories.length &&
    (elRefs.current = Array(categories.length)
      .fill()
      .map(() => createRef()));

  return categories.map((value, index) => (
    <div ref={elRefs.current[index]} className="card" key={index}>
      <div
        className="card-details"
        onClick={() => {
          elRefs.current[index].current.setAttribute("class", "card-open");
          current(index, value);

          lastClicked !== undefined &&
            elRefs.current[lastClicked].current.setAttribute("class", "card") &&
            current(undefined, "Categories");

          lastClicked !== index
            ? setLastClicked(index)
            : setLastClicked(undefined) || current(undefined, "Categories");
        }}
      >
        <div className="card-title">{value}</div>
        <div className="card-subtitle">{locations || "Location stubs"}</div>
      </div>
      <div
        className="card-button"
        onClick={() =>
          elRefs.current[index].current.animate(
            {
              transform: "scale(0)",
              opacity: 0,
            },
            400
          ) && setTimeout(() => remove(index), 400)
        }
      >
        <div className="card-x1">
          <div className="card-x2"></div>
        </div>
      </div>
    </div>
  ));
};

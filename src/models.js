let length;

export const reloadStorage = () => {
  let arr = [];
  let len = localStorage.length;

  for (let i = 0; i < len; i++)
    localStorage[i] ? arr.push(localStorage[i]) : len++;

  length = len;
  return arr;
};

export const Category = {
  create: (name) => {
    localStorage.setItem(length, name);
    return name;
  },
  edit: (name, updatedName) => {
    localStorage.removeItem(name);
    localStorage.setItem(name, updatedName);
  },
  remove: (name) => {
    localStorage.removeItem(Object.keys(localStorage).sort()[name]);
  },
};

// export const Location = {
//   create: (location) => {
//     localStorage.setItem(location[0], location);
//     return location[0];
//   },
//   edit: (name, newLocation) => {
//     localStorage.removeItem(name);
//     localStorage.setItem(newLocation[0], newLocation);
//   },
//   remove: (name) => {
//     localStorage.removeItem(name);
//   },
// };

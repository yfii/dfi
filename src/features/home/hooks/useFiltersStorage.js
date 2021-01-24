const FILTER_STORAGE = 'filterStorage';

let data;

if (localStorage) {
  try {
    data = JSON.parse(localStorage.getItem(FILTER_STORAGE));
    if (!data) {
      data = {};
    }
  } catch (e) {
  }
}

const useFilterStorage = () => {

  const saveData = () => {
    if (localStorage) {
      try {
        localStorage.setItem(FILTER_STORAGE, JSON.stringify(data));
      } catch (e) {
      }
    }
  }

  const setStorage = (key, value) => {
    data[key] = value;
    saveData();
  }

  const getStorage = (key) => {
    return data[key];
  }

  return { getStorage, setStorage };
};

export default useFilterStorage;
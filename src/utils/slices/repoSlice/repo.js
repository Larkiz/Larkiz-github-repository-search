import { createSlice } from "@reduxjs/toolkit";

// Начальное значение
const initialState = {
  repositories: null,
  selected: null,
  pending: false,
};

// форматирование даты в формат день.месяц.год
function dateFormat(dateNode) {
  let date = new Date(dateNode);

  return `${("0" + (date.getDay() + 1)).slice(-2)}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${date.getFullYear()}`;
}

// форматирование даты всех полученных данных
const dateFormatArray = function (input) {
  const output = [];

  for (let element of input) {
    output.push({
      ...element,
      updatedAt: dateFormat(element.updatedAt),
    });
  }

  return output;
};
const reposSlice = createSlice({
  name: "repos",
  initialState,

  reducers: {
    // установка состояния
    set: (state, action) => {
      state.repositories = dateFormatArray(action.payload);
      state.pending = false;
    },
    // установка выбранного репозитория
    select: (state, action) => {
      state.selected = action.payload;
    },
    // начало ожидания данных
    startPending: (state) => {
      state.pending = true;
    },
  },
});

export const { set, select, startPending } = reposSlice.actions;

export default reposSlice.reducer;

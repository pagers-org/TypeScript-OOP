export const editState = {
  value: false,
  getEditState: function () {
    this.value;
  },
  toggleEditState: function () {
    this.value = !this.value;
  },
};

let index = 0;
export const getColNumber = () => {
  index++;
  return index;
};

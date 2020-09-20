module.exports = {
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    },

    arrayMaker: (string) => {
      ingredientArray = string.split(", ");

      return ingredientArray;

  },

  arrayMaker: (string) => {
    ingredientArray = string.split(", ");

    return ingredientArray;
  },
};

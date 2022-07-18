export const randomThreeProducts = (productArray) => {
  let result = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * productArray.length);

    result.push(productArray[randomIndex]);
  }

  return result;
};

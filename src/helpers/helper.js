const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join("");
};

const searchProducts = (products, search) => {
  if (!search) return products;
  const searchedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

const filterProducts = (products, category) => {
  if (!category) return products;
  const filteredProducts = products.filter((p) => p.category === category);
  return filteredProducts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const sumProducts = (products) => {
  const itemsCounter = products.reduce(
    (IC, product) => IC + product.quantity,
    0
  );
  const totalPrice = products
    .reduce((TP, product) => TP + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemsCounter, totalPrice };
};

const productQuantity = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) return 0;
  return state.selectedItems[index].quantity;
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitQuery,
  sumProducts,
  productQuantity,
};

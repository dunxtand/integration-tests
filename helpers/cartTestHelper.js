const secondProducts = {
  US: "/collections/h2",
  UK: "/products/h1-neon-multi",
  EU: "/products/h1-black-multi",
  DE: "/products/h1-black-multi",
  AU: "/collections/h2"
}

module.exports = {
  getSecondProduct: function (site) {
    return secondProducts[site];
  }
}

const settings = {
  US: {
    asSeenOnPage: true,
    cart: true,
    offers: true,
    siteSearch: true,
    supportPage: true,
    translationFile: true
  },
  UK: {
    asSeenOnPage: true,
    cart: true,
    offers: true,
    siteSearch: true,
    supportPage: true,
    translationFile: true
  },
  EU: {
    asSeenOnPage: true,
    cart: true,
    offers: true,
    siteSearch: true,
    supportPage: false,
    translationFile: true
  },
  DE: {
    asSeenOnPage: true,
    cart: true,
    offers: true,
    siteSearch: false,
    supportPage: false,
    translationFile: true
  },
  AU: {
    asSeenOnPage: true,
    cart: true,
    offers: true,
    siteSearch: true,
    supportPage: false,
    translationFile: true
  }
}

module.exports = function (site) {
  return settings[site];
}

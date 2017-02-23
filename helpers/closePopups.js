const {
  countryPopup, countryPopupClose,
  cookiePopup, cookiePopupClose
} = require("../values/general");

const settings = {
  US: {
    hasCountryPopup: false,
    hasCookiePopup: false
  },
  UK: {
    hasCountryPopup: true,
    hasCookiePopup: true
  },
  EU: {
    hasCountryPopup: true,
    hasCookiePopup: true
  },
  DE: {
    hasCountryPopup: true,
    hasCookiePopup: true
  },
  AU: {
    hasCountryPopup: true,
    hasCookiePopup: false
  }
}

module.exports = function (site, browser) {
  if (settings[site].hasCountryPopup) {
    browser.waitForExist(countryPopup, 2000);
    browser.click(countryPopupClose);
  }
  if (settings[site].hasCookiePopup) {
    browser.waitForExist(cookiePopup, 4000);
    browser.click(cookiePopupClose);
  }
}

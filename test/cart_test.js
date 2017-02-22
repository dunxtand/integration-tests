const baseUrls = require("../values/baseUrls");
const cartSelectors = require("../values/cartSelectors");
const { productSelectors, swatchSelectors } = require("../values/shopPageSelectors");
const checkoutSelectors = require("../values/checkoutSelectors");
const pageUrls = require("../values/pageUrls");
const {
  countryPopup, countryPopupClose,
  cookiePopup, cookiePopupClose
} = require("../values/general");
const {
  openCart, closeCart,
  cartContainer, productContainer,
  productTitle, productCount,
  productCountPlus, productCountMinus, productRemove,
  emptyCartText, checkout
} = cartSelectors;
const { addToCart, productNameSelector, quantitySelector } = productSelectors;
const { checkoutProductContainer, checkoutProductName } = checkoutSelectors;

module.exports = function (site, secondProductSegment, hasCountryPopup, hasCookiePopup) {
  const baseUrl = baseUrls[site];
  const checkoutPageTitle = checkoutSelectors.checkoutPageTitles[site];
  var firstProductName = "";

  describe(`shopping cart functionality at ${baseUrl}`, function () {

    it("has basic open and close", function () {
      browser.url(baseUrl);
      if (hasCountryPopup) { closeCountryPopup(browser); }
      if (hasCookiePopup)  { closeCookiePopup(browser);  }
      expect(browser.isVisible(cartContainer)).to.equal(false);
      browser.click(openCart);
      browser.pause(500);
      expect(browser.isVisible(cartContainer)).to.equal(true);
      browser.click(closeCart);
      browser.pause(500);
      expect(browser.isVisible(cartContainer)).to.equal(false);
    });

    it("cart opens when items are added", function () {
      let page = baseUrl + pageUrls.h1;
      browser.url(page);
      browser.click(addToCart);
      browser.pause(1500);
      expect(browser.isVisible(cartContainer)).to.equal(true);
    });

    it("adds the correct item", function () {
      let productName = browser.getText(productNameSelector).toLowerCase();
      firstProductName = productName; // save for later test
      let cartProductName = browser.getText(productTitle).toLowerCase();
      expect(cartProductName).to.equal(productName);
    });

    it("adds the correct quantity of the item", function () {
      let productQuantity = browser.getValue(quantitySelector);
      let cartProductQuantity = browser.getValue(productCount);
      expect(cartProductQuantity).to.equal(productQuantity);
    });

    it("increases quanity from the cart", function () {
      browser.click(productCountPlus);
      browser.pause(1000);
      let cartProductQuantity = browser.getValue(productCount);
      expect(cartProductQuantity).to.equal("2");
    });

    it("descreases quantity from the cart", function () {
      browser.click(productCountMinus);
      browser.pause(1000);
      let cartProductQuantity = browser.getValue(productCount);
      expect(cartProductQuantity).to.equal("1");
    });

    it("adds a second item to the cart", function () {
      let page = baseUrl + secondProductSegment;
      browser.url(page);
      browser.click(addToCart);
      browser.pause(1500);
      expect(browser.isVisible(cartContainer)).to.equal(true);
      let count = browser.elements(productContainer).value.length;
      expect(count).to.equal(2);
    });

    it("goes to the checkout from the cart", function () {
      browser.click(checkout);
      browser.pause(5000);
      let title = browser.getTitle();
      expect(title).to.equal(checkoutPageTitle);
    });

    it("completely removes products from the cart", function () {
      browser.back();
      browser.pause(3000);
      if (site !== "AU") { // for some reason AU site cart is already open..
        browser.click(openCart);
        browser.pause(500);
      }
      browser.click(productCountMinus);
      browser.pause(2000);
      expect(browser.elements(productContainer).value.length).to.equal(1);
      browser.click(productRemove);
      browser.pause(2000);
      expect(browser.elements(productContainer).value.length).to.equal(0);
    });

  });
}

function closeCountryPopup (browser) {
  browser.waitForExist(countryPopup);
  browser.click(countryPopupClose);
}

function closeCookiePopup (browser) {
  browser.waitForExist(cookiePopup, 4000);
  browser.click(cookiePopupClose);
}

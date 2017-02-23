const urlSegment = require("../values/pageUrls").h1;
const { productSelectors, optinSelectors } = require("../values/shopPageSelectors");
const {
  checkoutDiscountInput, discountErrorElement, submitDiscountCode
} = require("../values/checkoutSelectors");
const {
  productCountPlus, productCountMinus,
  productCount, productTitle, closeCart, openCart,
  checkout
} = require("../values/cartSelectors");
const closePopups = require("../helpers/closePopups");

module.exports = function (site) {
  const baseUrl = getBaseUrl(site);
  const {
    freePackEnabled, freePackThreshold, freePackTitle,
    discountPercentage, discountCode
  } = require(`../values/offers/${site}`);

  describe(`discounts and offers for ${baseUrl}`, function () {
    const url = baseUrl + urlSegment;

    describe(`buy ${freePackThreshold} get 1 free`, function () {
      const { addToCart } = productSelectors;
      const url = baseUrl + urlSegment;
      browser.url(url);

      it(`adds ${freePackTitle} to the cart after ${freePackThreshold} packs`, function () {
        closePopups(site, browser);
        browser.click(addToCart);
        browser.pause(1500);
        for (var i=0; i<(freePackThreshold-1); ++i) {
          browser.click(productCountPlus);
          browser.pause(1500);
        }
        browser.pause(3500);
        let freePackName = browser.getText(productTitle)[0].toLowerCase();
        let freePackCount = browser.getValue(productCount)[0];
        expect(freePackName).to.equal(freePackTitle);
        expect(freePackCount).to.equal("1");
      })


      it(`adds 2 ${freePackTitle} to the cart after ${freePackThreshold*2} packs`, function () {
        for (var i=0; i<freePackThreshold; ++i) {
          browser.elements(productCountPlus).value[1].click();
          browser.pause(1500);
        }
        browser.pause(3500);
        let freePackCount = browser.getValue(productCount)[0];
        expect(freePackCount).to.equal("2");
      })

      it(`returns to 1 ${freePackTitle} when taken below ${freePackThreshold*2} packs`, function () {
        browser.elements(productCountMinus).value[1].click();
        browser.pause(3500);
        let freePackCount = browser.getValue(productCount)[0];
        expect(freePackCount).to.equal("1");
      })

      it(`removes ${freePackTitle} completely when taken below ${freePackThreshold} packs`, function () {
        for (var i=0; i<freePackThreshold; ++i) {
          browser.elements(productCountMinus).value[1].click();
          browser.pause(1500);
        }
        browser.pause(3500);
        let firstProductTitle = browser.getText(productTitle).toLowerCase();
        expect(firstProductTitle).to.not.equal(freePackTitle);
      })
    })

    describe("mailing-list discount", function () {
      const { optinButton, successClass, optinClose } = optinSelectors;
      browser.pause(3000);

      it("correct discount displays on the optin button", function () {
        let text = browser.getText(optinButton);
        expect(text.includes(discountPercentage)).to.equal(true);
      })

      it("discount code works at checkout", function () {
        browser.click(checkout);
        browser.pause(5000);
        browser.setValue(checkoutDiscountInput, discountCode);
        browser.click(submitDiscountCode);
        browser.pause(4000);
        expect(browser.isVisible(discountErrorElement)).to.equal(false);
      })
    })
  })
}

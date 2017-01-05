const baseUrl = require("../../values/baseUrls").US
const urlSegment = require("../../values/pageUrls").h1
const { productSelectors, optinSelectors } = require("../../values/shopPageSelectors")
const {
  productCountPlus, productCountMinus,
  productTitle, closeCart
} = require("../../values/cartSelectors")
const {
  freePackEnabled, freePackThreshold, freePackTitle,
  discountPercentage, discountCode
} = require("../../values/offers/US")

describe(`discounts and offers for ${baseUrl}`, () => {
  const url = baseUrl + urlSegment

  describe(`buy ${freePackThreshold} get 1 free`, () => {
    const { addToCart } = productSelectors
    var productPlus, productMinus
    const url = baseUrl + urlSegment; browser.url(url)

    it(`adds ${freePackTitle} to the cart after ${freePackThreshold} packs`, () => {
      browser.click(addToCart)
      browser.pause(1500)
      for (var i=0; i<(freePackThreshold-1); ++i) {
        browser.click(productCountPlus)
        browser.pause(1500)
      }
      let freePackName = browser.getText(productTitle)[0].toLowerCase()
      expect(freePackName).to.equal(freePackTitle)
    })

    it(`adds 2 ${freePackTitle} to the cart after ${freePackThreshold*2} packs`, () => {
      let newPlusSelector = productCountPlus + ":nth-of-type(2)"
      for (var i=0; i<(freePackThreshold); ++i) {
        browser.click(newPlusSelector)
        browser.pause(1500)
      }
    })

    it(`returns to 1 ${freePackTitle} when taken below ${freePackThreshold*2} packs`, () => {

    })

    it(`removes ${freePackTitle} when taken below ${freePackThreshold} packs`, () => {

    })
  })

  // this works individually, but not when in the same session as above
  //
  // describe("discount popup mailing-list button", () => {
  //   const { optinButton, successClass, optinClose } = optinSelectors
  //
  //   it("displays the correct discount", () => {
  //     let text = browser.getText(optinButton)
  //     expect(text.includes(discountPercentage)).to.equal(true)
  //   })
  //
  //   it("reveals the popup when clicked", () => {
  //     expect(browser.isVisible(successClass)[1]).to.equal(false)
  //     browser.click(optinButton)
  //     browser.pause(2000)
  //     expect(browser.isVisible(successClass)[1]).to.equal(true)
  //     // browser.click(optinClose)
  //     // browser.pause(1000)
  //     // expect(browser.isVisible(successClass)[1]).to.equal(false)
  //   })
  // })
})

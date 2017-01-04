const { US, GB, DE, EU, AU } = require("../../values/baseUrls")
const cartSelectors = require("../../values/cartSelectors")
const {
  countryPopup, countryPopupClose,
  cookiePopup, cookiePopupClose
} = require("../../values/general")

describe("basic cart actions", () => {

  describe("cart open and close ", () => {
    const { openCart, closeCart, cartContainer } = cartSelectors
    const sitesArray = [US, GB, DE, EU, AU]

    sitesArray.forEach((site) => {
      it(`works at ${site}`, () => {
        browser.url(site)
        if (browser.isVisible(countryPopup)) {
          browser.click(countryPopupClose)
        }
        if (browser.isVisible(cookiePopup)) {
          browser.click(cookiePopupClose)
        }
        expect(browser.isVisible(cartContainer)).to.equal(false)
        browser.click(openCart)
        expect(browser.isVisible(cartContainer)).to.equal(true)
        browser.pause(1000)
        browser.click(closeCart)
        browser.pause(1000)
        expect(browser.isVisible(cartContainer)).to.equal(false)
      })
    })

  })
})

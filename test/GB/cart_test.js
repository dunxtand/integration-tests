const baseUrl = require("../../values/baseUrls").GB
const cartSelectors = require("../../values/cartSelectors")
const { productSelectors, swatchSelectors } = require("../../values/shopPageSelectors")
const checkoutSelectors = require("../../values/checkoutSelectors")
const pageUrls = require("../../values/pageUrls")
const {
  countryPopup, countryPopupClose,
  cookiePopup, cookiePopupClose
} = require("../../values/general")

describe(`shopping cart functionality at ${baseUrl}`, () => {
  const {
    openCart, closeCart,
    cartContainer, productContainer,
    productTitle, productCount,
    productCountPlus, productCountMinus, productRemove,
    emptyCartText, checkout
  } = cartSelectors
  const { addToCart, productNameSelector, quantitySelector } = productSelectors
  const { checkoutProductContainer, checkoutProductName } = checkoutSelectors
  const checkoutPageTitle = checkoutSelectors.checkoutPageTitles.GB
  var firstProductName

  it("has basic open and close", () => {
    browser.url(baseUrl)
    browser.pause(1500)
    browser.click(countryPopupClose)
    browser.click(cookiePopupClose)
    expect(browser.isVisible(cartContainer)).to.equal(false)
    browser.click(openCart)
    browser.pause(500)
    expect(browser.isVisible(cartContainer)).to.equal(true)
    browser.click(closeCart)
    browser.pause(500)
    expect(browser.isVisible(cartContainer)).to.equal(false)
  })

  it("cart opens when items are added", () => {
    let page = baseUrl + pageUrls.athletic
    browser.url(page)
    browser.click(addToCart)
    browser.pause(1500)
    expect(browser.isVisible(cartContainer)).to.equal(true)
  })

  it("adds the correct item", () => {
    let productName = browser.getText(productNameSelector).toLowerCase()
    firstProductName = productName // save for later test
    let cartProductName = browser.getText(productTitle).toLowerCase()
    expect(cartProductName).to.equal(productName)
  })

  it("adds the correct quantity of the item", () => {
    let productQuantity = browser.getValue(quantitySelector)
    let cartProductQuantity = browser.getValue(productCount)
    expect(cartProductQuantity).to.equal(productQuantity)
  })

  it("increases quanity from the cart", () => {
    browser.click(productCountPlus)
    browser.pause(1000)
    let cartProductQuantity = browser.getValue(productCount)
    expect(cartProductQuantity).to.equal("2")
  })

  it("descreases quantity from the cart", () => {
    browser.click(productCountMinus)
    browser.pause(1000)
    let cartProductQuantity = browser.getValue(productCount)
    expect(cartProductQuantity).to.equal("1")
  })

  it("adds a second item to the cart", () => {
    let page = baseUrl + pageUrls.athletic + "/products/h1-white" // make metallics when back in stock
    browser.url(page)
    browser.click(addToCart)
    browser.pause(1500)
    expect(browser.isVisible(cartContainer)).to.equal(true)
    let count = browser.elements(productContainer).value.length
    expect(count).to.equal(2)
    console.log(browser.elements(quantitySelector))
  })

  it("goes to the checkout from the cart", () => {
    browser.click(checkout)
    browser.pause(5000)
    let title = browser.getTitle()
    expect(title).to.equal(checkoutPageTitle)
  })

  it("completely removes products from the cart", () => {
    browser.back()
    browser.pause(3000)
    browser.click(openCart)
    browser.pause(500)
    browser.click(productCountMinus)
    browser.pause(1000)
    expect(browser.elements(productContainer).value.length).to.equal(1)
    browser.click(productRemove)
    browser.pause(1000)
    expect(browser.elements(productContainer).value.length).to.equal(0)
    let cartText = browser.getText(cartContainer)
    expect(cartText.includes(emptyCartText)).to.equal(true)
  })
})

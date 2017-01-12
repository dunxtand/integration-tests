const baseUrl = require("../../values/baseUrls").AU
const urlSegment = require("../../values/pageUrls").asSeenOn
const { articleLink, viewTheLookLink } = require("../../values/asSeenOnPageSelectors")
const { notFound } = require("../../values/general")

describe(`As Seen On page links for ${baseUrl}`, () => {
  browser.url(baseUrl + urlSegment)

  describe("publication feature links", () => {
    // figure out how to test whether the external links
    // are live articles (non-404)
  })

  describe("celebrity 'view the look' links", () => {

    it("redirect to live products", () => {
      let elements = browser.elements(viewTheLookLink).value
      getUrls(elements).forEach(url => {
        browser.url(url)
        let text = browser.getText("body").toLowerCase()
        expect(text.includes(notFound)).to.equal(false)
      })
    })

  })

})

function getUrls (elements) {
  return elements.map(el => el.getAttribute("href"))
}

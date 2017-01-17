const baseUrl = require("../../values/baseUrls").DE
const urlSegment = require("../../values/pageUrls").asSeenOn
const { articleLink, viewTheLookLink } = require("../../values/asSeenOnPageSelectors")
const { notFoundGerman } = require("../../values/general")

describe(`As Seen On page links for ${baseUrl}`, function () {
  browser.url(baseUrl + urlSegment)

  describe("publication feature links", function () {
    // figure out how to test whether the external links
    // are live articles (non-404)
  })

  describe("celebrity 'view the look' links", function () {
    this.timeout(40000)

    it("redirect to live products", () => {
      let elements = browser.elements(viewTheLookLink).value
      getUrls(elements).forEach(url => {
        browser.url(url)
        let text = browser.getText("body").toLowerCase()
        expect(text.includes(notFoundGerman)).to.equal(false)
      })
    })

  })

})

function getUrls (elements) {
  return elements.map(el => el.getAttribute("href"))
}

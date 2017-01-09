const baseUrl = require("../../values/baseUrls").US
const urlSegment = require("../../values/pageUrls").support
const { search, ticket } = require("../../values/supportPageSelectors")
const {
  searchForm, searchInput, resultsContainer,
  resultsList, hasResults, noResults
} = search
const {
  form, nameInput, emailInput,
  reasonSelect, detailsTextarea, submit
} = ticket

describe(`support page functionality for ${baseUrl}`, () => {
  browser.url(baseUrl + urlSegment)

  describe("article search", () => {
    it("returns a message when there are no results", () => {
      let noMatchesSearch = "abcdefghijkl"
      browser.setValue(searchInput, noMatchesSearch)
      browser.submitForm(searchForm)
      browser.pause(1000)
      expect(browser.isExisting(noResults)).to.equal(true)
      expect(browser.isExisting(hasResults)).to.equal(false)
    })

    it("returns results when there are search parameter matches", () => {
      let hasMatchesSearch = "hickies"
      browser.setValue(searchInput, hasMatchesSearch)
      browser.submitForm(searchForm)
      browser.pause(1000)
      expect(browser.isExisting(resultsList)).to.equal(true)
      expect(browser.isExisting(noResults)).to.equal(false)
    })
  })

  describe("ticket submission", () => {
    // coming soon
  })
})

const baseUrl = require("../../values/baseUrls").US
const urlSegment = require("../../values/pageUrls").support
const { search, ticket } = require("../../values/supportPageSelectors")

describe(`support page functionality for ${baseUrl}`, () => {
  browser.url(baseUrl + urlSegment)

  describe("article search", () => {
    const {
      searchForm, searchInput, resultsContainer,
      resultsList, hasResults, noResults
    } = search

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

  describe("ZenDesk ticket submission", () => {
    const {
      form, nameInput, emailInput, reasonSelect,
      detailsTextarea, submit, popup, popupClose,
      errorMessageSelector
    } = ticket
    const {
      blankName, blankEmail, invalidEmail,
      noReason, blankDetails
    } = ticket.errorMessages

    let blank = "",
        badEmail = "duncanhickiescom",
        name = "Duncan Standish",
        email = "duncan@hickies.com",
        details = "Where are my shoes?"

    it("rejects an unselected reason field", () => {
      browser.setValue(nameInput, name)
      browser.setValue(emailInput, email)
      browser.setValue(detailsTextarea, details)
      browser.submitForm(form).pause(500)
      let errorMessage = browser.getText(errorMessageSelector)
      expect(errorMessage).to.equal(noReason)
    })

    it("rejects a blank name field", () => {
      browser.click(popupClose)
      browser.selectByIndex(reasonSelect, 1)
      browser.setValue(nameInput, blank)
      browser.submitForm(form).pause(500)
      let errorMessage = browser.getText(errorMessageSelector)
      expect(errorMessage).to.equal(blankName)
    })

    it("rejects a blank email field", () => {
      browser.click(popupClose)
      browser.setValue(nameInput, name)
      browser.setValue(emailInput, blank)
      browser.submitForm(form).pause(500)
      let errorMessage = browser.getText(errorMessageSelector)
      expect(errorMessage).to.equal(blankEmail)
    })

    it("rejects an invalid email", () => {
      browser.click(popupClose)
      browser.setValue(emailInput, badEmail)
      browser.submitForm(form).pause(500)
      let errorMessage = browser.getText(errorMessageSelector)
      expect(errorMessage).to.equal(invalidEmail)
    })

    it("rejects a blank details field", () => {
      browser.click(popupClose)
      browser.setValue(emailInput, email)
      browser.setValue(detailsTextarea, blank)
      browser.submitForm(form).pause(500)
      let errorMessage = browser.getText(errorMessageSelector)
      expect(errorMessage).to.equal(blankDetails)
    })

  })
})

const baseUrls = require("../values/baseUrls");
const {
  popup, link, form, input,
  results, failure, noResultsMessage
} = require("../values/siteSearchSelectors");
const closePopups = require("../helpers/closePopups");

module.exports = function (site, hasCountryPopup, hasCookiePopup) {
  const baseUrl = baseUrls[site];

  describe(`site search for ${baseUrl}`, function () {
    browser.url(baseUrl);

    it("activates popup when link is clicked", function () {
      closePopups(site, browser);
      expect(browser.isVisible(popup)).to.equal(false);
      browser.click(link);
      expect(browser.isVisible(popup)).to.equal(true);
    });

    it("renders an error message when there are no results", function () {
      let noResultsParam = "abcdefghijkl";
      browser.setValue(input, noResultsParam);
      browser.submitForm(form);
      browser.pause(500);
      expect(browser.isExisting(failure)).to.equal(true);
      let text = browser.getText(failure);
      expect(text).to.equal(noResultsMessage);
    });

    it("renders a list of links when there are results", function () {
      let resultsParam = "laces";
      browser.setValue(input, resultsParam);
      browser.submitForm(form);
      browser.pause(500);
      expect(browser.isExisting(failure)).to.equal(false);
      let resultsElements = browser.elements(results + " p a").value;
      expect(resultsElements.length > 0).to.equal(true);
    });

  });
}

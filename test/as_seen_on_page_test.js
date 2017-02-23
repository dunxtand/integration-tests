const urlSegment = require("../values/pageUrls").asSeenOn;
const { articleLink, viewTheLookLink } = require("../values/asSeenOnPageSelectors");
const { notFoundEnglish, notFoundGerman } = require("../values/general");

module.exports = function (site) {
  const baseUrl = getBaseUrl(site);
  const notFoundMessage = site === "DE" ? notFoundGerman : notFoundEnglish;

  describe(`As Seen On page links for ${baseUrl}`, function () {
    browser.url(baseUrl + urlSegment);

    describe("celebrity 'view the look' links", function () {
      this.timeout(40000);

      it("redirect to live products", function () {
        let elements = browser.elements(viewTheLookLink).value;
        getUrls(elements).forEach(url => {
          browser.url(url);
          let text = browser.getText("body").toLowerCase();
          expect(text.includes(notFoundMessage)).to.equal(false);
        });
      });

    });

  });
}

function getUrls (elements) {
  return elements.map(el => el.getAttribute("href"));
}

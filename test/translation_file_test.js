const missingTransMessage = require("../values/general").translationMissing;
const baseUrls = require("../values/baseUrls");

module.exports = function (site, urlSegments) {
  const baseUrl = baseUrls[site];
  describe(`no missing text at ${baseUrl} for:`, function () {
    urlSegments.forEach(seg => {
      let url = baseUrl + seg;
      it(`${seg}`, function () {
        browser.url(url);
        let text = browser.getText("body").toLowerCase();
        expect(text.includes(missingTransMessage)).to.equal(false);
      });
    });
  });
}

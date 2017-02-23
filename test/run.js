const sites = process.env.SITES.includes(",") ? process.env.SITES.split(",") : [process.env.SITES];
// const tests = process.env.TESTS.includes(",") ? process.env.TESTS.split(",") : [process.env.TESTS];

const testFns = {
  asSeenOnPage: require("./as_seen_on_page_test"),
  cart: require("./cart_test"),
  offers: require("./offers_test"),
  siteSearch: require("./site_search_test"),
  supportPage: require("./support_page_test"),
  translationFile: require("./translation_file_test")
};

const getAllowedTests = require("../helpers/getAllowedTests");

sites.forEach(site => {
  var allowedTests = getAllowedTests(site);
  for (testName in allowedTests) {
    if (!!allowedTests[testName]) {
      testFns[testName](site); // run test
    }
  }
});

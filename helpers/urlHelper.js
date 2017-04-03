const baseUrls = require("../values/baseUrls");
const {
  home, h1, h2, kids, giftCard,
  asSeenOn, howItWorks, support,
  ourStory, ambassadors, wholesale
} = require("../values/pageUrls");

const activePages = {
  US: [home, h1, h2, kids, asSeenOn, howItWorks, support, ourStory, ambassadors, wholesale],
  UK: [home, h1, h2, asSeenOn, howItWorks, support, ourStory, ambassadors, wholesale],
  EU: [home, h1, asSeenOn, howItWorks, ourStory, ambassadors],
  DE: [home, h1, asSeenOn, howItWorks, ourStory, wholesale],
  AU: [home, h1, h2, kids, asSeenOn, howItWorks, ourStory]
}

module.exports = {
  getBaseUrl: function (site) {
    return baseUrls[site];
  },
  getActivePages: function (site) {
    return activePages[site];
  }
}

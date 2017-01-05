const baseUrl = require("../../values/baseUrls").DE
const {
  home, athletic, metallic, asSeenOn,
  howItWorks, ourStory, ambassadors, wholesale
} = require("../../values/pageUrls")
const pagesToCheck = [
  home, athletic, metallic, asSeenOn,
  howItWorks, ourStory, wholesale
]
const { translationMissing } = require("../../values/general")

describe(`no missing text at ${baseUrl} for:`, () => {

  pagesToCheck.forEach(urlSegment => {
    let url = baseUrl + urlSegment
    it(`${urlSegment}`, () => {
      browser.url(url)
      let text = browser.getText("body")
      expect(text.includes(translationMissing)).to.equal(false)
    })
  })

})

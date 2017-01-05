const baseUrl = require("../../values/baseUrls").AU
const {
  home, athletic, metallic, asSeenOn,
  howItWorks, ourStory
} = require("../../values/pageUrls")
const pagesToCheck = [
  home, athletic, metallic, asSeenOn,
  howItWorks, ourStory
]
const { translationMissing } = require("../../values/general")

describe(`no missing text at ${baseUrl} for:`, () => {
  pagesToCheck.forEach(urlSegment => {
    let url = baseUrl + urlSegment
    it(`${urlSegment}`, () => {
      browser.url(url)
      let text = browser.getText("body").toLowerCase()
      expect(text.includes(translationMissing)).to.equal(false)
    })
  })
})

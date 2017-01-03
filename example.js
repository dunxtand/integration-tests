var webdriverio = require("webdriverio")
var options = {
  desiredCapabilities: {
    browserName: "firefox",
  }
}

webdriverio
  .remote(options)
  .init()
  .url("https://www.hickies.com/")
  .getTitle().then(function (title) {
    console.log("Title was: " + title)
  })
  .catch(function (err) {
    console.log(err)
  })
  .end()

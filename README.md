download selenium standalone server:

    curl -O http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar

download geckodriver for osx:

    curl -L https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-macos.tar.gz | tar xz

...or find other versions at https://github.com/mozilla/geckodriver/releases (executable named 'geckodriver' should be in the root of the project)

install necessary packages:

    npm install

install WebdriverIO globally to be able to use the 'wdio' command (npm scripts rely on it):

    npm install -g webdriverio

start selenium server (make sure you have Java installed and available first):

    npm start

run all tests:

    npm test

run site tests for US, the UK, the EU, Germany, and Australia, respectively:

    npm run us

    npm run gb

    npm run eu

    npm run de

    npm run au

run cart tests for all sites:

    npm run cart

run offers tests for all sites:

    npm run offers

run translation file tests for all sites:

    npm run trans

run As Seen On page tests for all sites:

    npm run seenon

# Hickies Integration Tests

Testing site functionality and scanning for bugs for Hickies sites in the
[United States](https://www.hickies.com), the [United Kingdom](https://uk.hickies.eu),
the [European Union](https://www.hickies.eu), [Germany](https://www.hickies.de),
and [Australia](https://www.hickies.com.au).

### Requirements

These tests use **Node.js**, **npm**, **Java**, and **Firefox 50** to run.

### Setup

Download the Selenium standalone server:

    curl -O http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar

Download geckodriver for OSX...

    curl -L https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-macos.tar.gz | tar xz

...or find other versions at https://github.com/mozilla/geckodriver/releases

**An executable named 'geckodriver' should be in the root of the project.**

Install WebdriverIO globally (npm scripts rely on the 'wdio' terminal command):

    npm install -g webdriverio

Install necessary npm modules:

    npm install

### Usage

Start the Selenium server:

    npm start

Run all tests:

    npm test

Run site all tests for a particular site:

    npm run us

    npm run uk

    npm run eu

    npm run de

    npm run au

Run cart tests for all sites:

    npm run cart

Run offers tests for all sites:

    npm run offers

Run translation file tests for all sites:

    npm run trans

Run As Seen On page tests for all sites:

    npm run seenon

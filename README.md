download selenium standalone server:

    curl -O http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar

geckodriver at https://github.com/mozilla/geckodriver/releases

(geckodriver executable should be in the root of the project)

start selenium server:

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

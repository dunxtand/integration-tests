module.exports = {
  link: "#questions-btn",
  search: {
    searchForm: "#support-search-form",
    searchInput: "#support-search-bar",
    resultsContainer: "#support-results-div",
    resultsList: "#results-list",
    hasResults: ".has-results",
    noResults: "#support-no-results"
  },
  ticket: {
    form: "#support-ticket",
    nameInput: "#name",
    emailInput: "#email",
    reasonSelect: "#reason",
    detailsTextarea: "#details",
    submit: "#ticket-extras button",
    popup: "#support-ticket-popup",
    popupClose: ".mfp-close",
    errorMessages: {
      blankName: "name can't be blank",
      blankEmail: "email can't be blank",
      invalidEmail: "email must be valid",
      noReason: "must choose a reason",
      blankDetails: "details can't be blank"
    }
  }
}

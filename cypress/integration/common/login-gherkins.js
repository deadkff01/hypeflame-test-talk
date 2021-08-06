/* eslint-disable */

Given("I open the login page", () => {
  cy.visit("http://localhost:3000");
});

When("I fill username input with {string}", (text) => {
  cy.get("#username").type(text);
});

When("I fill password input with {string}", (text) => {
  cy.get("#password").type(text);
});

Then("Click enter button", () => {
  cy.get("#btn-login").click();
});

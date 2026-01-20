import { Selectors } from "../support/selectors";

describe("Add Member Form", () => {
  beforeEach(() => {
    cy.visit("/add-member");
  });

  it("should display the form title", () => {
    cy.get(Selectors.MemberForm.title).should("contain", "New Member");
  });

  it("should display all form fields", () => {
    cy.get(Selectors.MemberForm.firstName).should("exist");
    cy.get(Selectors.MemberForm.lastName).should("exist");
    cy.get(Selectors.MemberForm.dateOfBirth).should("exist");
    cy.get(Selectors.MemberForm.sex).should("exist");
    cy.get(Selectors.MemberForm.status).should("exist");
  });

  it("should display validation errors for empty required fields", () => {
    // Click submit without filling form
    cy.get(Selectors.MemberForm.submit).click();

    // Should show validation errors
    cy.get(Selectors.MemberForm.firstNameError).should("exist");
    cy.get(Selectors.MemberForm.lastNameError).should("exist");
  });

  it("should fill and submit the form successfully", () => {
    // Fill in the form
    cy.get(Selectors.MemberForm.firstName).type("John");
    cy.get(Selectors.MemberForm.lastName).type("Doe");
    cy.get(Selectors.MemberForm.dateOfBirth).type("1990-05-15");

    // MUI Select requires clicking to open dropdown, then clicking the menu item
    cy.get(Selectors.MemberForm.sex).click();
    cy.get('[data-value="male"]').click();

    cy.get(Selectors.MemberForm.status).click();
    cy.get('[data-value="ACTIVE"]').click();

    // Submit the form
    cy.get(Selectors.MemberForm.submit).click();

    // Should navigate to member details page
    cy.url().should("include", "/members/");
  });

  it("should navigate back when clicking cancel", () => {
    cy.get(Selectors.MemberForm.cancel).click();

    // App may include query params like ?page=1&page_size=10
    cy.url().should("include", Cypress.config().baseUrl);
    cy.url().should("not.include", "/add-member");
  });
});

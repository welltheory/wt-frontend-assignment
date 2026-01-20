import { Selectors } from "../support/selectors";

describe("Members List Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the page header", () => {
    cy.get(Selectors.PageHeader.title).should("contain", "Members");
    cy.get(Selectors.PageHeader.subtitle).should(
      "contain",
      "Manage your members",
    );
  });

  it("should display the members data grid", () => {
    // Wait for loading to complete and grid to appear
    cy.get(Selectors.MembersList.grid, { timeout: 10000 }).should("exist");
  });

  it("should have pagination controls", () => {
    cy.get(".MuiDataGrid-root").should("exist");
    cy.get(Selectors.MembersList.pagination).should("exist");
  });

  it("should update URL query params when changing page", () => {
    // Wait for initial load
    cy.get(Selectors.MembersList.grid).should("exist");

    // Check initial URL doesn't have params or has default
    cy.url().should("include", "/");

    // Click next page if available
    cy.get(Selectors.MembersList.paginationActions)
      .last()
      .click({ force: true });

    // URL should now include page param
    cy.url().should("include", "page=");
  });

  it("should persist pagination state on page reload", () => {
    // Navigate with query params - use page_size=5 so page 2 exists with 6 members
    cy.visit("/?page=2&page_size=5");

    // Grid should load
    cy.get(Selectors.MembersList.grid).should("exist");

    // URL should still have the params after load
    cy.url().should("include", "page=2");
    cy.url().should("include", "page_size=5");
  });

  it("should navigate to member details when clicking a row", () => {
    cy.get(Selectors.MembersList.grid).should("exist");

    // Click first row
    cy.get(Selectors.MembersList.row).first().click();

    // Should navigate to member details
    cy.url().should("include", "/members/");
  });

  it("should navigate to add member page", () => {
    cy.get(Selectors.MembersList.addButton).click();

    cy.url().should("include", "/add-member");
  });
});

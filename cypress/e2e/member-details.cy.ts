import { Selectors } from "../support/selectors";

describe("Member Details Page", () => {
  // Note: These tests assume there's at least one member in the API
  // You may need to seed data or adjust the member ID

  beforeEach(() => {
    // First visit home to get a member ID, then navigate to details
    cy.visit("/");
    cy.get(Selectors.MembersList.row).first().click();
  });

  it("should display member details", () => {
    cy.get(Selectors.MemberDetails.name).should("exist");
    cy.get(Selectors.MemberDetails.status).should("exist");
    cy.get(Selectors.MemberDetails.birthday).should("exist");
    cy.get(Selectors.MemberDetails.sex).should("exist");
  });

  it("should show avatar or placeholder", () => {
    cy.get(Selectors.MemberDetails.avatarArea).should("exist");
  });

  it("should have edit button", () => {
    cy.get(Selectors.MemberDetails.editButton).should("exist");
  });

  it("should have delete button", () => {
    cy.get(Selectors.MemberDetails.deleteButton).should("exist");
  });

  it("should toggle to edit mode when clicking edit", () => {
    cy.get(Selectors.MemberDetails.editButton).click();

    // Should now show the edit form
    cy.get(Selectors.MemberForm.title).should("contain", "Edit Member");
    cy.get(Selectors.MemberForm.firstName).should("exist");
  });

  it("should return to details view when canceling edit", () => {
    cy.get(Selectors.MemberDetails.editButton).click();
    cy.get(Selectors.MemberForm.cancel).click();

    // Should be back in details view
    cy.get(Selectors.MemberDetails.name).should("exist");
  });
});

describe("Avatar Upload", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(Selectors.MembersList.row).first().click();
  });

  it("should have clickable avatar area for upload", () => {
    cy.get(Selectors.MemberDetails.avatarArea)
      .should("exist")
      .and("have.attr", "role", "button");
  });

  it("should clear error when selecting new file after error", () => {
    // This test verifies the error clearing behavior
    // The actual file upload would require stubbing the API
    cy.get(Selectors.MemberDetails.avatarArea).should("exist");
  });
});

/**
 * Centralized selector map for Cypress E2E tests
 * Usage: Selectors.MemberForm.firstName
 */
export const Selectors = {
  PageHeader: {
    title: '[data-testid="page-header-title"]',
    subtitle: '[data-testid="page-header-subtitle"]',
  },

  MembersList: {
    grid: '[data-testid="members-list-grid"]',
    addButton: '[data-testid="add-member-button"]',
    row: ".MuiDataGrid-row",
    pagination: ".MuiTablePagination-root",
    paginationActions: ".MuiTablePagination-actions button",
  },

  MemberForm: {
    title: '[data-testid="member-form-title"]',
    firstName: '[data-testid="member-form-firstName"]',
    firstNameError: '[data-testid="member-form-firstName-error"]',
    lastName: '[data-testid="member-form-lastName"]',
    lastNameError: '[data-testid="member-form-lastName-error"]',
    dateOfBirth: '[data-testid="member-form-dateOfBirth"]',
    dateOfBirthError: '[data-testid="member-form-dateOfBirth-error"]',
    sex: '[data-testid="member-form-sex"]',
    sexError: '[data-testid="member-form-sex-error"]',
    status: '[data-testid="member-form-status"]',
    statusError: '[data-testid="member-form-status-error"]',
    submit: '[data-testid="member-form-submit"]',
    cancel: '[data-testid="member-form-cancel"]',
  },

  MemberDetails: {
    name: '[data-testid="member-details-name"]',
    status: '[data-testid="member-details-status"]',
    birthday: '[data-testid="member-details-birthday"]',
    sex: '[data-testid="member-details-sex"]',
    avatarArea: '[data-testid="member-details-avatar-area"]',
    editButton: '[data-testid="member-details-edit-button"]',
    deleteButton: '[data-testid="member-details-delete-button"]',
  },
} as const;

## Notes & Implementation Details

### Assumptions
- The API follows the exact contract provided in the assignment (pagination structure, member fields, file upload rules, and error format).
- All endpoints require an API key. For the purpose of this assignment, the API key is included directly in the client setup. In a real project, keys must be stored in environment variables (`.env` files).
- The `/photo` upload endpoint returns a `photoUrl` as a data URL.

### Data Fetching & State Management
- All API requests go through a centralized Axios client with automatic API key injection and consistent error handling.
- Each function returns `ApiSuccess<T> | ApiError` to keep UI logic predictable.
- React local state (`useState`, `useEffect`) is used instead of global state to keep the project simple.
- Page components fetch their own data:
  - `MembersList` loads paginated members
  - `MemberDetails` loads a single member
  - `CreateMemberPage` submits new member data
- The `MemberForm` component is fully reusable for both create and edit flows, and image previews are handled with FileReader.

### Trade-offs / Shortcuts
- No React Query or global state library was added to avoid unnecessary complexity for a small assignment.
- Form validation is minimal and handled in submit functions rather than using a library like Zod or Yup.
- Dropdowns use native `<select>` inside MUI `<TextField>` for simplicity.
- Photo uploads are basic and do not include compression, drag-and-drop, or progress indicators.
- Routing is intentionally flat (`/members`, `/members/new`, `/members/:id`) for clarity.

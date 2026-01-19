export const formatBirthday = (dateOfBirth: string) => {
  return new Date(dateOfBirth).toLocaleDateString();
};

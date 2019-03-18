export default function getFullName(firstName, lastName) {
  const givenName = firstName.charAt(0).toUpperCase() + firstName.substr(1);
  const surname = lastName.charAt(0).toUpperCase() + lastName.substr(1);
  return givenName + ' ' + surname;
}

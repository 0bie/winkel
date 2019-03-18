export default `
  mutation updateUser($input:UpdateUserInput!) {
    updateMe(input:$input) {
      email
      firstName
      lastName
    }
  }
`;

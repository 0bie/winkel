export default `
  mutation removeContact($id:ID!) {
    removeContact(id:$id) {
      email
      firstName
      lastName
    }
  }
`;

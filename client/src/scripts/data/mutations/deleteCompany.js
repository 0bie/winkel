export default `
  mutation removeCompany($id:ID!) {
    removeCompany(id:$id) {
      name
    }
  }
`;

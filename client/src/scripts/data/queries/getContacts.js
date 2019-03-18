export default `
  query {
    contacts {
      id
      email
      firstName
      lastName
      bio
      role
      createdAt
      social {
        link
        platform
      }
      messages {
        text
      }
    }
  }
`;

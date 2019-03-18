export default `
  query {
    me {
      apiKey
      firstName
      lastName
      email
      role
      orders
      offers
      messages
      social {
        link
        platform
      }
      image {
        src
        alt
        caption
      }
    }
  }
`;

export default `
  query {
    companies {
      id
      name
      location
      image {
        src
        alt
      }
      quantity
      products {
        id
        name
      }
    }
  }
`;

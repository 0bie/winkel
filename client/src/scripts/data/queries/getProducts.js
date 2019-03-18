export default `
  query {
    products {
      id
      units
      name
      price
      image {
        src
        alt
      }
      supplier
      quantity
      saleBy
    }
  }
`;

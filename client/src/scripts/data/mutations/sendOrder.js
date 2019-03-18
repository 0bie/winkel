export default `
  mutation sendOrder($id:ID!, $input:NewOrderInput!) {
    sendOrder(id:$id, input:$input) {
      name
      location
      orders {
        products {
          name
        }
        lead {
          firstName
          lastName
        }
      }
    }
  }
`;

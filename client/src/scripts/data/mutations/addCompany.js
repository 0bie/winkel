export default `
  mutation addNewCompany(
    $name:String!,
    $location:String!,
    $quantity:String!,
    $image:NewImageInput
  ) {
    newCompany(input: {name: $name, location: $location, quantity: $quantity, image: $image}) {
      id
      name
      location
      quantity
      image {
        src
        alt
      }
      products {
        name
      }
    }
  }
`;

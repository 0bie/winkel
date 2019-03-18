export default `
  mutation addNewContact(
    $firstName:String!,
    $lastName:String!,
    $email:String!,
    $role:String,
    $bio:String,
    $image:NewImageInput,
    $social:NewSocialInput
  ) {
    newContact(input: {firstName: $firstName, lastName: $lastName, email: $email, role: $role, bio: $bio, image: $image, social: $social}) {
      id
      email
      role
      bio
      firstName
      lastName
    }
  }
`;

export default `
  mutation updateContact(
    $id:ID!,
    $firstName:String,
    $lastName:String,
    $email:String,
    $role:String,
    $bio:String,
    $social:UpdateSocialInput
  ) {
    updateContact(id: $id, input: {firstName: $firstName, lastName: $lastName, email: $email, role: $role, bio: $bio, social: $social}) {
      id
      firstName
      lastName
      role
      bio
    }
  }
`;

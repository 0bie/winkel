export default `
  mutation messageContact($id:ID!, $subject:String!, $text:String!) {
    messageContact(id: $id, input: {text: $text, subject: $subject}) {
      firstName
      lastName
      messages {
        text
      }
    }
  }
`;

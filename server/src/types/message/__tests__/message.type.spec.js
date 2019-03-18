import {buildSchema} from 'graphql';
import {mockServer} from 'graphql-tools';
import {loadTypeSchema} from '../../../utils/schema';
import {schemaToTemplateContext} from 'graphql-codegen-core';

describe('Message schema', () => {

  let schema;
  let typeDefs;


  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['message', 'user', 'social', 'image'].map(loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = schemaToTemplateContext(buildSchema(typeDefs));
  });

  describe('schema:', () => {

    test('Message has base fields', () => {

      let type = schema.types.find((type) => {
        return type.name === 'Message';
      });
      if (!type) {
        type = schema.interfaces.find((type) => {
          return type.name === 'Message';
        });
      }
      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        subject: 'String!',
        text: 'String!',
        from: 'User!'
      };
      type.fields.forEach((field) => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });

    });

    it('Message query', async () => {
      const server = mockServer(typeDefs);
      const query = `
        {
          message {
            id
            subject
            text
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {errors} = await server.query(query);
      expect(errors).not.toBeTruthy();
    });

  });

});

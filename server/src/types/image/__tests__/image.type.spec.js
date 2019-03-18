import {buildSchema} from 'graphql';
import {mockServer} from 'graphql-tools';
import {loadTypeSchema} from '../../../utils/schema';
import {schemaToTemplateContext} from 'graphql-codegen-core';

describe('Image schema', () => {

  let schema;
  let typeDefs;


  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['image', 'user', 'social'].map(loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = schemaToTemplateContext(buildSchema(typeDefs));
  });

  describe('schema:', () => {

    test('Image has base fields', () => {

      let type = schema.types.find((type) => {
        return type.name === 'Image';
      });
      if (!type) {
        type = schema.interfaces.find((type) => {
          return type.name === 'Image';
        });
      }
      expect(type).toBeTruthy();
      const baseFields = {
        src: 'String!',
        alt: 'String!',
        caption: 'String'
      };
      type.fields.forEach((field) => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });

    });

    test('NewImageInput has correct fields', () => {

      const input = schema.inputTypes.find((input) => {
        return input.name === 'NewImageInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        src: 'String!',
        alt: 'String!',
        caption: 'String'
      };
      input.fields.forEach((field) => {
        const type = fields[field.name];
        expect(field.raw).toBe(type);
      });

    });

    it('Image query', async () => {
      const server = mockServer(typeDefs);
      const query = `
        {
          image {
            src
            alt
            caption
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {errors} = await server.query(query);
      expect(errors).not.toBeTruthy();
    });

  });

});

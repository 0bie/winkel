import {buildSchema} from 'graphql';
import {mockServer} from 'graphql-tools';
import {loadTypeSchema} from '../../../utils/schema';
import {schemaToTemplateContext} from 'graphql-codegen-core';

describe('Social schema', () => {

  let schema;
  let typeDefs;


  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['user', 'social', 'image'].map(loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = schemaToTemplateContext(buildSchema(typeDefs));
  });

  describe('schema:', () => {

    test('Social has base fields', () => {

      let type = schema.types.find((type) => {
        return type.name === 'Social';
      });
      if (!type) {
        type = schema.interfaces.find((type) => {
          return type.name === 'Social';
        });
      }
      expect(type).toBeTruthy();
      const baseFields = {
        platform: 'String!',
        link: 'String!'
      };
      type.fields.forEach((field) => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });

    });

    it('addSocial mutation', async () => {
      const server = mockServer(typeDefs);
      const query = `
        mutation addSocial($input: NewSocialInput!) {
          addSocial(input: $input) {
            platform
            link
          }
        }
      `;
      const vars = {
        input: {
          platform: 'facebook',
          link: 'http://facebook'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {errors} = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });

    it('updateSocial mutation', async () => {
      const server = mockServer(typeDefs);
      const query = `
        mutation updateSocial($input: UpdateSocialInput!) {
          updateSocial(input: $input) {
            platform
            link
          }
        }
      `;
      const vars = {
        input: {
          platform: 'twitter',
          link: 'http://twitter'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {errors} = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });

    it('Social query', async () => {
      const server = mockServer(typeDefs);
      const query = `
        {
          social {
            platform
            link
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {errors} = await server.query(query);
      expect(errors).not.toBeTruthy();
    });

  });

});

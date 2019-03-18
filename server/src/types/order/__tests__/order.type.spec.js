import {buildSchema} from 'graphql';
import {mockServer} from 'graphql-tools';
import {loadTypeSchema} from '../../../utils/schema';
import {schemaToTemplateContext} from 'graphql-codegen-core';

describe('Order schema', () => {

  let schema;
  let typeDefs;


  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['order', 'user', 'social', 'image', 'product', 'date', 'pagination'].map(loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = schemaToTemplateContext(buildSchema(typeDefs));
  });

  describe('schema:', () => {

    test('Order has base fields', () => {

      let type = schema.types.find((type) => {
        return type.name === 'Order';
      });
      if (!type) {
        type = schema.interfaces.find((type) => {
          return type.name === 'Order';
        });
      }
      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        lead: 'User!',
        units: 'Int!',
        delivery: 'String',
        products: '[Product!]!'
      };
      type.fields.forEach((field) => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });

    });

    it('Order query', async () => {
      const server = mockServer(typeDefs);
      const query = `
        {
          order {
            id
            lead {
              firstName
              email
            }
            units
            delivery
            products {
              name
              price
            }
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {errors} = await server.query(query);
      expect(errors).not.toBeTruthy();
    });

  });

});

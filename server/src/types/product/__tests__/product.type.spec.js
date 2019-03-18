import {buildSchema} from 'graphql';
import {mockServer} from 'graphql-tools';
import {loadTypeSchema} from '../../../utils/schema';
import {schemaToTemplateContext} from 'graphql-codegen-core';

describe('Product schema', () => {

  let schema;
  let typeDefs;


  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['product', 'image', 'user', 'date', 'pagination', 'social'].map(loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    // console.log('TYPES: ', typeDefs);
    schema = schemaToTemplateContext(buildSchema(typeDefs));
    // console.log('SCHEMA: ', schema);
  });

  describe('schema:', () => {

    test('Product has base fields', () => {

      let type = schema.types.find((type) => {
        return type.name === 'Product';
      });
      if (!type) {
        type = schema.interfaces.find((type) => {
          return type.name === 'Product';
        });
      }
      // console.log('TYPE: ', type);
      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        name: 'String!',
        price: 'Float!',
        image: 'Image!',
        supplier: 'String!',
        quantity: 'String!',
        units: 'Int!',
        saleBy: 'Date'
      };
      type.fields.forEach((field) => {
        // console.log('FIELD?: ', field);
        const type = baseFields[field.name];
        // console.log('TYPE?: ', type);
        expect(field.raw).toBe(type);
      });

    });

    test('NewProductInput has correct fields', () => {

      const input = schema.inputTypes.find((input) => {
        return input.name === 'NewProductInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        name: 'String!',
        units: 'Int!',
        price: 'Float!',
        image: 'NewImageInput!',
        supplier: 'String!',
        quantity: 'String!',
        saleBy: 'Date!'
      };
      input.fields.forEach((field) => {
        // console.log('FIELD?: ', field);
        const type = fields[field.name];
        // console.log('TYPE?: ', type);
        expect(field.raw).toBe(type);
      });

    });

    test('UpdateProductInput has correct fields', () => {

      const input = schema.inputTypes.find((input) => {
        return input.name === 'UpdateProductInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        name: 'String',
        units: 'Int',
        price: 'Float',
        quantity: 'String',
        image: 'NewImageInput',
        saleBy: 'Date'
      };
      input.fields.forEach((field) => {
        // console.log('FIELD?: ', field);
        const type = fields[field.name];
        // console.log('TYPE?: ', type);
        expect(field.raw).toBe(type);
      });

    });

    it('Product query', async () => {
      const server = mockServer(typeDefs);
      const query = `
        {
          product(id: "46re3o") {
            id
            name
            price
            supplier
            quantity
            units
            image {
              src
              alt
            }
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {errors} = await server.query(query);
      expect(errors).not.toBeTruthy();
    });

    it('Products query', async () => {
      const server = mockServer(typeDefs);
      const query = `
        {
          products {
            id
            name
            price
            supplier
            quantity
            units
            image {
              src
              alt
            }
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {errors} = await server.query(query);
      expect(errors).not.toBeTruthy();
    });

    it('newProduct mutation', async () => {
      const server = mockServer(typeDefs);
      const query = `
        mutation addNewProduct($input: NewProductInput!) {
          newProduct(input: $input) {
            name
            units
            price
            supplier
            quantity
            image {
              src
              alt
            }
          }
        }
      `;
      const vars = {
        input: {
          name: 'test product',
          units: 500,
          price: 99.99,
          quantity: 'retail',
          supplier: 'apple',
          saleBy: new Date(),
          image: {src: 'http://localhost', alt: 'test alternate text'}
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {errors} = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });

    it('updateProduct mutation', async () => {
      const server = mockServer(typeDefs);
      const query = `
        mutation updateProduct($id: ID!, $input: UpdateProductInput!) {
          updateProduct(id: $id, input: $input) {
            name
            price
            quantity
            supplier
            image {
              src
              alt
            }
          }
        }
      `;
      const vars = {
        id: '4yr6v8',
        input: {
          units: 259
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {errors} = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });

    it('removeProduct mutation', async () => {
      const server = mockServer(typeDefs);
      const query = `
        mutation removeProduct($id: ID!) {
          removeProduct(id: $id) {
            name
            supplier
            image {
              src
              alt
            }
          }
        }
      `;
      const vars = {
        id: '4yr6v8'
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {errors} = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });

  });

});

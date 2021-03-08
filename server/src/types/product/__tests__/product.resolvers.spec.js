import mongoose from 'mongoose';
import {AuthenticationError} from 'apollo-server';

import {Product} from '../product.model/';
import resolvers from '../product.resolvers';

describe('Resolvers', () => {

  describe('resolvers:', () => {

    test('Product can query by ID', async () => {
      const product = await Product.create({
        name: 'new product',
        price: 19.99,
        supplier: 'new supplier',
        quantity: 'retail',
        units: 1000,
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const result = await resolvers.Query.product(null, {id: product._id}, {user: {}});
      expect(`${result._id}`).toBe(`${product._id}`);
    });

    test('Product can query all products', async () => {
      const products = await Product.create([
        {
          name: 'new product',
          price: 35.99,
          supplier: 'new supplier',
          quantity: 'retail',
          units: 1000,
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        },
        {
          name: 'newer product',
          price: 39.99,
          supplier: 'newer supplier',
          quantity: 'retail',
          units: 1000,
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        },
      ]);
      const result = await resolvers.Query.products(null, {}, {user: {}});
      expect(result).toHaveLength(2);
      products.forEach((product) => {
        const match = result.find((r) => `${r._id}` === `${product._id}`);
        expect(match).toBeTruthy();
      });
    });

    test('Product can limit query', async () => {
      const products = await Product.create([
        {
          name: 'new product',
          price: 35.99,
          supplier: 'new supplier',
          quantity: 'retail',
          units: 1000,
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        },
        {
          name: 'newer product',
          price: 39.99,
          supplier: 'newer supplier',
          quantity: 'retail',
          units: 1000,
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        },
        {
          name: 'new new product',
          price: 39.99,
          supplier: 'new new supplier',
          quantity: 'retail',
          units: 1000,
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        }
      ]);
      const result = await resolvers.Query.productList(null, {pagination: {offset: 0, first: 2}}, {user: {}});
      expect(result).toHaveLength(2);
    });

    test('newProduct creates a new product', async () => {
      const args = {
        input: {
          _id: mongoose.Types.ObjectId(),
          name: 'new product',
          price: 35.99,
          supplier: 'new supplier',
          quantity: 'retail',
          units: 1000
        }
      };
      const result = await resolvers.Mutation.newProduct(null, args, {
        user: {
          role: 'admin',
          _id: mongoose.Types.ObjectId()
        }
      });
      Object.keys(args.input).forEach((field) => {
        expect(result[field]).toBe(args.input[field]);
      });
    });

    test('updateProduct updates a product', async () => {
      const product = await Product.create({
        name: 'new product',
        price: 19.99,
        supplier: 'new supplier',
        quantity: 'retail',
        units: 1000,
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const args = {
        id: product._id,
        input: {
          units: 998
        }
      };
      const result = await resolvers.Mutation.updateProduct(null, args, {
        user: {
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${product._id}`);
      expect(`${result.units}`).toBe('998');
    });

    test('removeProduct removes an existing product', async () => {
      const product = await Product.create({
        name: 'new product',
        price: 19.99,
        supplier: 'new supplier',
        quantity: 'retail',
        units: 1000,
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const args = {
        id: product._id
      };
      const result = await resolvers.Mutation.removeProduct(null, args, {
        user: {role: 'admin'}
      });
      expect(`${result._id}`).toBe(`${product._id}`);
    });

  });

  describe('auth:', () => {

    test('Product requires auth', () => {
      expect(() =>
        resolvers.Query.product(null, {id: mongoose.Types.ObjectId()}, {})
      ).toThrow(AuthenticationError);
    });

    test('Products requires auth', () => {
      expect(() => resolvers.Query.products(null, {}, {}))
        .toThrow(AuthenticationError);
    });

    test('NewProduct requires admin role', () => {
      expect(() =>
        resolvers.Mutation.newProduct(
          null,
          {
            input: {
              name: 'new product',
              price: 35.99,
              supplier: 'new supplier',
              quantity: 'retail',
              units: 1000
            }
          },
          {}
        )
      ).toThrow(AuthenticationError);
      expect(() =>
        resolvers.Mutation.newProduct(
          null,
          {
            input: {
              name: 'new product',
              price: 35.99,
              supplier: 'new supplier',
              quantity: 'retail',
              units: 1000
            }
          },
          {user: {role: 'member'}}
        )
      ).toThrow(AuthenticationError);
    });

    test('updateProduct requires admin role', () => {
      expect(() =>
        resolvers.Mutation.updateProduct(
          null,
          {
            id: mongoose.Types.ObjectId(),
            input: {units: 998}
          },
          {}
        )
      ).toThrow(AuthenticationError);
      expect(() =>
        resolvers.Mutation.updateProduct(
          null,
          {
            id: mongoose.Types.ObjectId(),
            input: {units: 998}
          },
          {user: {role: 'member'}}
        )
      ).toThrow(AuthenticationError);
    });

    test('removeProduct requires admin role', () => {
      expect(() =>
        resolvers.Mutation.removeProduct(
          null,
          {id: mongoose.Types.ObjectId()},
          {}
        )
      ).toThrow(AuthenticationError);
      expect(() =>
        resolvers.Mutation.removeProduct(
          null,
          {id: mongoose.Types.ObjectId()},
          {user: {role: 'member'}}
        )
      ).toThrow(AuthenticationError);
    });

  });

});

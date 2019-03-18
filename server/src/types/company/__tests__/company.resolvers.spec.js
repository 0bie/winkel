import mongoose from 'mongoose';

import {Company} from '../company.model/';
import resolvers from '../company.resolvers';

describe('Resolvers', () => {

  describe('resolvers:', () => {

    test('Company can query by ID', async () => {
      const company = await Company.create({
        name: 'test company',
        location: 'test location',
        quantity: 'wholesale',
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const result = await resolvers.Query.company(null, {id: company._id}, {user: {}});
      expect(`${result._id}`).toBe(`${company._id}`);
    });

    test('Company can query all companies', async () => {
      // const user = mongoose.Types.ObjectId();
      const companies = await Company.create([
        {
          name: 'test company',
          location: 'test location',
          quantity: 'wholesale',
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        },
        {
          name: 'test company1',
          location: 'test location1',
          quantity: 'retail',
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        }
      ]);
      const result = await resolvers.Query.companies(null, {}, {user: {}});
      expect(result).toHaveLength(2);
      companies.forEach((company) => {
        const match = result.find((r) => `${r._id}` === `${company._id}`);
        expect(match).toBeTruthy();
      });
    });

    test('newCompany creates a new company', async () => {
      const args = {
        input: {
          _id: mongoose.Types.ObjectId(),
          name: 'test company',
          location: 'Hamilton, ON',
          quantity: 'retail'
        }
      };
      const result = await resolvers.Mutation.newCompany(null, args, {
        user: {
          role: 'admin',
          _id: mongoose.Types.ObjectId()
        }
      });
      Object.keys(args.input).forEach((field) => {
        expect(result[field]).toBe(args.input[field]);
      });
    });

    test('updateCompany updates a company', async () => {
      const company = await Company.create({
        name: 'test company',
        location: 'Victoria, BC',
        quantity: 'wholesale'
      });
      const args = {
        id: company._id,
        input: {
          quantity: 'retail'
        }
      };
      const result = await resolvers.Mutation.updateCompany(null, args, {
        user: {
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${company._id}`);
      expect(`${result.quantity}`).toBe('retail');
    });

    test('removeCompany removes an existing company', async () => {
      const company = await Company.create({
        name: 'test company',
        location: 'Victoria, BC',
        quantity: 'retail'
      });
      const args = {
        id: company._id
      };
      const result = await resolvers.Mutation.removeCompany(null, args, {
        user: {role: 'admin'}
      });
      expect(`${result._id}`).toBe(`${company._id}`);
    });

  });

});

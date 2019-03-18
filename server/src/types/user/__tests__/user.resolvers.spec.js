import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import {User} from '../user.model/';
import resolvers from '../user.resolvers';

describe('Resolvers', () => {

  describe('resolvers:', () => {

    test('User can query information', async () => {
      const user = await User.create({
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'admin',
        password: 'newPassword',
        apiKey: 'kerkfdnjn43232wnww54#$',
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const result = await resolvers.Query.me(null, null, {user});
      expect(`${result._id}`).toBe(`${user._id}`);
    });

    test('updateUser updates current user', async () => {
      const user = await User.create({
        _id: mongoose.Types.ObjectId(),
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'admin',
        password: 'newPassword',
        apiKey: 'kerkfdnjn43232wnww54#$',
        bio: 'This is a sample biography'
      });
      const args = {
        input: {
          email: 'alice.bob@mail.com'
        }
      };
      const result = await resolvers.Mutation.updateMe(null, args, {
        user: {
          _id: user._id,
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${user._id}`);
      expect(`${result.email}`).toBe('alice.bob@mail.com');
    });

    test('newUser creates a new user', async () => {
      const args = {
        input: {
          _id: mongoose.Types.ObjectId(),
          firstName: 'alice',
          lastName: 'bob',
          email: 'alice@mail.com',
          role: 'admin',
          password: 'newPassword'
        }
      };
      const result = await resolvers.Mutation.signup(null, args);
      Object.keys(args.input).forEach((field) => {
        if (field === 'password') {
          bcrypt.compare(args.input[field], result[field], (error, matched) => {
            if (!error && matched) {
              if (matched) return;
            }
          });
        } else {
          expect(result[field]).toBe(args.input[field]);
        }
      });
    });

  });

});

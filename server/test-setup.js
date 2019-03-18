import _ from 'lodash';
import cuid from 'cuid';
import mongoose from 'mongoose';
import config from './src/config';

import {Contact} from './src/types/contact/contact.model';
import {Company} from './src/types/company/company.model';
import {Product} from './src/types/product/product.model';
import {User} from './src/types/user/user.model';

const models = {Contact, Company, Product, User};

global.newId = () => {
  return mongoose.Types.ObjectId();
}

function remove(collection) {
  new Promise((resolve, reject) => {
    collection.remove((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

beforeEach(async (done) => {

  const db = cuid();
  function clearDB() {
    return Promise.all(_.map(
      mongoose.connection.collections,
      (collection) => remove(collection)
    ));
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(config.dbUrl + db, {useNewUrlParser: true, autoIndex: true});
      await clearDB();
      await Promise.all(Object.keys(models).map((name) => models[name].init()));
    } catch (error) {
      console.log('connection error');
      console.error(error);
      throw error;
    }
  } else {
    await clearDB();
  }

  done();

});

afterEach(async (done) => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});

afterAll((done) => done());

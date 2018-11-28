import mongoose from 'mongoose';
import Item, { serializeList } from '../../src/models/Item';
import createConnection from '../../src/connection';


import DATA from './items';


export function waitConnection() {
  return createConnection();
}


export function getItems() {
  return new Promise(resolve => {
    Item.insertMany(DATA, () => {
      resolve();
    });
  }).then(getSerialized);
}

export function dropCollection(name='items') {
  return new Promise(resolve => {
    mongoose.connection.db.dropCollection(name, () => {
      resolve();
    });
  })
}

export function closeConnection() {
  return mongoose.connection.close();
}

export function getSerialized() {
  return Item.find({}).then((items) => serializeList(items));
}
import * as mongoose from 'mongoose';
const mockgoose = require('mockgoose');

export async function connectDB(t: any, done: Function) {
  mockgoose(mongoose).then(() => {
    const connectionPromise: any = mongoose.createConnection('mongodb://localhost:27017/mern-test');
    done();
  });
}

export function dropDB(t: any) {
  mockgoose.reset((err: Error) => {
    if (err) t.fail('Unable to reset test database');
  });
}

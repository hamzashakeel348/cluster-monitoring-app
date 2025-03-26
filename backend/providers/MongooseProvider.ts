import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import mongoose from 'mongoose';

export default class MongooseProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const connectionUri =
      process.env.MONGO_URI || 'mongodb://localhost:27017/cluster_db';
    await mongoose.connect(connectionUri);
    console.log('Database connection successful');
  }

  public async shutdown() {
    await mongoose.disconnect();
  }
}

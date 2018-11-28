import logger from './logger';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_TEST = ENVIRONMENT === 'test';
export const MONGODB_URI = IS_TEST ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
export const API_ROUTE_PREFIX = process.env.API_ROUTE_PREFIX;
export const PORT = process.env.PORT;
export const COLLECTION_NAME = 'Item';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { API_ROUTE_PREFIX, PORT } from './util/secrets';
import logger from './util/logger';

import router from './router';
import createConnection from './connection';

createConnection();

// Create Express server
const app = express();
// Express configuration
app.set('port', PORT || 3000);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(API_ROUTE_PREFIX, router);

export default app;

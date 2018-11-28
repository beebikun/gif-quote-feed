import express from 'express';

import * as apiController from './controllers/api';

const router = express.Router();
const BASE = '/items/';
const LIST_URL = `${ BASE }?`;
const DETAIL_URL = `${ BASE }:itemId([0-9a-f]{24})/?`;

router.get(LIST_URL, apiController.list);
router.post(LIST_URL, apiController.create);

router.get(DETAIL_URL, apiController.detail);
router.put(DETAIL_URL, apiController.update);
router.delete(DETAIL_URL, apiController.remove);

export default router;

import Types from 'Types';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import logger from '../util/logger';
import Item, { serializeList } from '../models/Item';

/**
 * GET /items
 * Get items list
 */
export async function list(req: Request, res: Response) {
  Item.find({})
    .then(onSuccess)
    .catch(onError);

  function onSuccess(items: Types.ItemModel[]): void {
    const data: Types.IItem[] = serializeList(items);
    res.json(data);
  }

  function onError(error: Error): void {
    logger.error(error && error.toString());
    res.status(500).send(error);
  }
}


/**
 * POST /items
 * Create a new item
 */
export function create({ body }: Request, res: Response) {
  Item
    .create(body)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(item: Types.ItemModel): void {
    const data: Types.IItem = item.serialize();
    res.status(201).json(data);
  }

  function onError(error: Error): void {
    if (error.name === 'ValidationError') {
      // tslint:disable-next-line:no-any
      (error as any)._message = 'Validation failed';
    }
    logger.error(error && error.toString());
    res.status(500).send(error);
  }
}

///////////////////////////////////////////////////////////////////////////////
interface IDetailRequest extends Request {
  params: {
    itemId: string;
  };
}
/**
 * GET /items/:itemId
 * Get item details
 */
export function detail({ params }: IDetailRequest, res: Response) {
  Item
    .findById(params.itemId)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(item: Types.ItemModel | null): void {
    if (item === null) {
      res.status(404).send('');
    } else {
      const data: Types.IItem = item.serialize();
      res.json(data);
    }
  }

  function onError(error: Error): void {
    logger.error(error && error.toString());
    res.status(500).send(error);
  }
}


/**
 * PUT /items/:itemId
 * Update item
 */
export function update({ params, body }: IDetailRequest, res: Response) {
  Item.findByIdAndUpdate(params.itemId, body, { new: true })
    .then(onSuccess)
    .catch(onError);

  function onSuccess(item: Types.ItemModel | null): void {
    if (item === null) {
      res.status(404).send('');
    } else {
      const data: Types.IItem = item.serialize();
      res.json(data);
    }
  }

  function onError(error: Error): void {
    logger.error(error && error.toString());
    if (error.name === 'ObjectParameterError') {
      error.name = 'ValidationError';
    }
    if (error.name === 'ValidationError') {
      // tslint:disable-next-line:no-any
      (error as any)._message = 'Validation failed';
    }
    res.status(500).send(error);
  }
}


/**
 * DELETE /items/:itemId
 * Remove item
 */
export function remove({ params }: IDetailRequest, res: Response) {
  Item.findByIdAndRemove(params.itemId)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(item: Types.ItemModel | null): void {
    if (item === null) {
      res.status(404).send('');
    } else {
      res.json({});
    }
  }

  function onError(error: Error): void {
    logger.error(error && error.toString());
    res.status(500).send(error);
  }
}


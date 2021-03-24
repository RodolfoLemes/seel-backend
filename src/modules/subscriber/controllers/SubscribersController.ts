import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSubscribeService from '../services/CreateSubscriberService';

export default class SubscribersController {
  async create(req: Request, res: Response): Promise<Response> {
    const createSubscriber = container.resolve(CreateSubscribeService);

    await createSubscriber.execute(req.body);

    return res.status(204).send();
  }
}

import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConfirmPaymentService from '../services/ConfirmPaymentService';
import CreateSubscribeService from '../services/CreateSubscriberService';
import ListSubscribersService from '../services/ListSubscribersService';

export default class SubscribersController {
  async create(req: Request, res: Response): Promise<Response> {
    const createSubscriber = container.resolve(CreateSubscribeService);

    await createSubscriber.execute(req.body);

    return res.status(204).send();
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { paid } = req.query;

    const isPaid = paid ? paid === 'true' : undefined;

    const listSubscribers = container.resolve(ListSubscribersService);
    const subscribers = await listSubscribers.execute({
      isPaid,
    });

    return res.json(classToClass(subscribers));
  }

  async confirm(req: Request, res: Response): Promise<Response> {
    const { email = undefined, cpf = undefined, rg = undefined } = req.body;

    const confirmPayment = container.resolve(ConfirmPaymentService);
    await confirmPayment.execute({
      email,
      cpf,
      rg,
    });

    return res.status(204).send();
  }
}

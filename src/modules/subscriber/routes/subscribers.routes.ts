import { celebrate, Joi, Segments } from 'celebrate';
import { validator } from 'cpf-cnpj-validator';
import { Router } from 'express';

import Authentication from '../middlewares/Authentication';
import DateAuthorization from '../middlewares/DateAuthorization';
import SubscribersController from '../controllers/SubscribersController';

const custom = Joi.extend(validator);

const router = Router();
const subscribersController = new SubscribersController();

router.post(
  '/',
  DateAuthorization,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      rg: Joi.string().required(),
      cpf: custom.document().cpf(),
      cep: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      university: Joi.string().required(),
      phone: Joi.string().required(),
      membership: Joi.string().optional(),
      value: Joi.number().required(),
    },
  }),
  subscribersController.create,
);

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      paid: Joi.string(),
    },
  }),
  Authentication,
  subscribersController.list,
);

router.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().optional(),
      rg: Joi.string().optional(),
      cpf: custom.document().cpf().optional(),
    },
  }),
  subscribersController.confirm,
);

export default router;

import { container } from 'tsyringe';

import './providers';

import ISubscribersRepository from '@modules/subscriber/repositories/ISubscribersRepository';
import TypeORMSubscribersRepository from '@modules/subscriber/repositories/implementations/TypeORMSubscribersRepository';

container.registerSingleton<ISubscribersRepository>(
  'SubscribersRepository',
  TypeORMSubscribersRepository,
);

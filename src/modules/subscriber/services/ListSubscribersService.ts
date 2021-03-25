import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Subscriber from '../entities/Subscriber';
import ISubscribersRepository from '../repositories/ISubscribersRepository';

interface IRequest {
  secret: string;
  isPaid?: boolean;
}

@injectable()
export default class ListSubscribersService {
  constructor(
    @inject('SubscribersRepository')
    private subscribersRepository: ISubscribersRepository,
  ) {}

  public async execute({
    secret,
    isPaid = undefined,
  }: IRequest): Promise<Subscriber[]> {
    if (authConfig.secret !== secret) throw new AppError('Forbidden', 403);

    if (isPaid === undefined) return this.subscribersRepository.findAll();

    return this.subscribersRepository.findByPaid(isPaid);
  }
}

import { inject, injectable } from 'tsyringe';
import Subscriber from '../entities/Subscriber';
import ISubscribersRepository from '../repositories/ISubscribersRepository';

interface IRequest {
  isPaid?: boolean;
}

@injectable()
export default class ListSubscribersService {
  constructor(
    @inject('SubscribersRepository')
    private subscribersRepository: ISubscribersRepository,
  ) {}

  public async execute({
    isPaid = undefined,
  }: IRequest): Promise<Subscriber[]> {
    if (isPaid === undefined) return this.subscribersRepository.findAll();

    return this.subscribersRepository.findByPaid(isPaid);
  }
}

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Subscriber from '../entities/Subscriber';
import ISubscribersRepository from '../repositories/ISubscribersRepository';

interface IRequest {
  name: string;
  email: string;
  rg: string;
  cpf: string;
  cep: string;
  address: string;
  city: string;
  university: string;
  phone: string;
  membership?: string | null;
  ticketType: string;
  value: number;
}

@injectable()
export default class CreateSubscribeService {
  constructor(
    @inject('SubscribersRepository')
    private subscriberRepository: ISubscribersRepository,
  ) {}

  public async execute({
    name,
    email,
    rg,
    cpf,
    cep,
    address,
    city,
    university,
    phone,
    membership,
    ticketType,
    value,
  }: IRequest): Promise<Subscriber> {
    if (await this.subscriberRepository.findByEmail(email))
      throw new AppError('Subscriber with same email is not valid');

    if (await this.subscriberRepository.findByCpf(cpf))
      throw new AppError('Subscriber with same CPF is not valid');

    if (await this.subscriberRepository.findByRg(rg))
      throw new AppError('Subscriber with same RG is not valid');

    const subscriber = await this.subscriberRepository.create({
      name,
      email,
      rg,
      cpf,
      cep,
      address,
      city,
      university,
      phone,
      membership,
      ticketType,
      value,
    });

    return subscriber;
  }
}

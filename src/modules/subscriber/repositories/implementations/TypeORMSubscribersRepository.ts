import ICreateSubscriberDTO from '@modules/subscriber/dto/ICreateSubscriberDTO';
import { getRepository, Repository } from 'typeorm';
import Subscriber from '../../entities/Subscriber';
import ISubscribersRepository from '../ISubscribersRepository';

export default class TypeORMSubscriberRepository
  implements ISubscribersRepository {
  private ormRepository: Repository<Subscriber>;

  constructor() {
    this.ormRepository = getRepository(Subscriber);
  }

  public async create(data: ICreateSubscriberDTO): Promise<Subscriber> {
    const subscriber = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(subscriber);

    return subscriber;
  }

  public async save(subscriber: Subscriber): Promise<Subscriber> {
    return this.ormRepository.save(subscriber);
  }

  public async findByEmail(email: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne({ where: { email } });

    return subscriber;
  }

  public async findByCpf(cpf: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne({ where: { cpf } });

    return subscriber;
  }

  public async findByRg(rg: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne({ where: { rg } });

    return subscriber;
  }
}

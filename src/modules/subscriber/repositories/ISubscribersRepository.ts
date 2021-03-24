import ICreateSubscriberDTO from '../dto/ICreateSubscriberDTO';
import Subscriber from '../entities/Subscriber';

export default interface ISubscribersRepository {
  create(data: ICreateSubscriberDTO): Promise<Subscriber>;
  save(subscriber: Subscriber): Promise<Subscriber>;
  findByEmail(email: string): Promise<Subscriber | undefined>;
  findByCpf(cpf: string): Promise<Subscriber | undefined>;
  findByRg(rg: string): Promise<Subscriber | undefined>;
}

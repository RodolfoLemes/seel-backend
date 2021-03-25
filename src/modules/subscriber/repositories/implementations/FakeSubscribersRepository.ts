import ICreateSubscriberDTO from '@modules/subscriber/dto/ICreateSubscriberDTO';
import Subscriber from '@modules/subscriber/entities/Subscriber';
import { v4 as uuidv4 } from 'uuid';
import ISubscribersRepository from '../ISubscribersRepository';

class FakeSubscriberRepository implements ISubscribersRepository {
  public subscribers: Subscriber[] = [];

  public async create(data: ICreateSubscriberDTO): Promise<Subscriber> {
    const subscriber = new Subscriber();

    Object.assign(subscriber, {
      id: uuidv4(),
      isPaid: false,
      ...data,
    });

    this.subscribers.push(subscriber);

    return subscriber;
  }

  public async save(subscriber: Subscriber): Promise<Subscriber> {
    const index = this.subscribers.findIndex(
      findSubscriber => findSubscriber.id === subscriber.id,
    );

    this.subscribers[index] = subscriber;

    return subscriber;
  }

  public async findByEmail(email: string): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.find(
      findSubscriber => findSubscriber.email === email,
    );

    return subscriber;
  }

  public async findByCpf(cpf: string): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.find(
      findSubscriber => findSubscriber.cpf === cpf,
    );

    return subscriber;
  }

  public async findByRg(rg: string): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.find(
      findSubscriber => findSubscriber.rg === rg,
    );

    return subscriber;
  }

  public async findByPaid(isPaid: boolean): Promise<Subscriber[]> {
    const subscriber = this.subscribers.filter(
      findSubscriber => findSubscriber.isPaid === isPaid,
    );

    return subscriber;
  }

  public async findAll(): Promise<Subscriber[]> {
    return this.subscribers;
  }
}

export default FakeSubscriberRepository;

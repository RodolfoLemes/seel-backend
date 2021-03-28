import Subscriber from '../entities/Subscriber';
import FakeSubscriberRepository from '../repositories/implementations/FakeSubscribersRepository';
import ListSubscribersService from './ListSubscribersService';
import normalSubscriber from '../mocks/subscriber';

let subscribersRepository: FakeSubscriberRepository;
let listSubscribers: ListSubscribersService;
let subscriber: Subscriber;

describe('list subscribers', () => {
  beforeEach(async () => {
    subscribersRepository = new FakeSubscriberRepository();
    listSubscribers = new ListSubscribersService(subscribersRepository);

    subscriber = await subscribersRepository.create(normalSubscriber);
  });

  it('should list subscribers', async () => {
    let subscribers;

    subscribers = await listSubscribers.execute({});

    expect(subscribers[0].id).toEqual(subscriber.id);

    subscribers = await listSubscribers.execute({
      isPaid: false,
    });

    expect(subscribers[0].isPaid).toEqual(subscriber.isPaid);
  });
});

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
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

    subscribers = await listSubscribers.execute({
      secret: authConfig.secret,
    });

    expect(subscribers[0].id).toEqual(subscriber.id);

    subscribers = await listSubscribers.execute({
      secret: authConfig.secret,
      isPaid: false,
    });

    expect(subscribers[0].isPaid).toEqual(subscriber.isPaid);
  });

  it('should not list the subscribers with incorrect secret', async () => {
    await expect(
      listSubscribers.execute({
        secret: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

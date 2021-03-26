import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/implementations/FakeMailProvider';
import FakeSubscriberRepository from '../repositories/implementations/FakeSubscribersRepository';
import CreateSubscribeService from './CreateSubscriberService';
import normalSubscriber from '../mocks/subscriber';

let subscriberRepository: FakeSubscriberRepository;
let mailProvider: FakeMailProvider;
let createSubscriber: CreateSubscribeService;

describe('create susbcriber', () => {
  beforeEach(async () => {
    subscriberRepository = new FakeSubscriberRepository();
    mailProvider = new FakeMailProvider();
    createSubscriber = new CreateSubscribeService(
      subscriberRepository,
      mailProvider,
    );
  });

  it('should create subscriber', async () => {
    const subscriber = await createSubscriber.execute(normalSubscriber);

    expect(subscriber.isPaid).toEqual(false);
  });

  it('should not create subscriber if same email', async () => {
    await createSubscriber.execute(normalSubscriber);

    await expect(
      createSubscriber.execute({
        ...normalSubscriber,
        rg: '1234',
        cpf: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create subscriber if same rg', async () => {
    await createSubscriber.execute(normalSubscriber);

    await expect(
      createSubscriber.execute({
        ...normalSubscriber,
        email: '1234',
        cpf: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create subscriber if same cpf', async () => {
    await createSubscriber.execute(normalSubscriber);

    await expect(
      createSubscriber.execute({
        ...normalSubscriber,
        rg: '1234',
        email: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

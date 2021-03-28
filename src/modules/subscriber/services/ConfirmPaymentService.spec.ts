import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/implementations/FakeMailProvider';
import FakeSubscriberRepository from '../repositories/implementations/FakeSubscribersRepository';
import ConfirmPaymentService from './ConfirmPaymentService';
import normalSubscriber from '../mocks/subscriber';
import Subscriber from '../entities/Subscriber';

let subscriberRepository: FakeSubscriberRepository;
let mailProvider: FakeMailProvider;
let confirmPayment: ConfirmPaymentService;
let subscriber: Subscriber;

describe('create susbcriber', () => {
  beforeEach(async () => {
    subscriberRepository = new FakeSubscriberRepository();
    mailProvider = new FakeMailProvider();
    confirmPayment = new ConfirmPaymentService(
      subscriberRepository,
      mailProvider,
    );

    subscriber = await subscriberRepository.create(normalSubscriber);
  });

  it('should confirm a payment with email', async () => {
    await confirmPayment.execute({
      email: subscriber.email,
    });

    const confirmedSubscriber = (await subscriberRepository.findByEmail(
      subscriber.email,
    )) as Subscriber;

    expect(confirmedSubscriber.isPaid).toEqual(true);
  });

  it('should confirm a payment with cpf', async () => {
    await confirmPayment.execute({
      cpf: subscriber.cpf,
    });

    const confirmedSubscriber = (await subscriberRepository.findByCpf(
      subscriber.cpf,
    )) as Subscriber;

    expect(confirmedSubscriber.isPaid).toEqual(true);
  });

  it('should confirm a payment with rg', async () => {
    await confirmPayment.execute({
      rg: subscriber.rg,
    });

    const confirmedSubscriber = (await subscriberRepository.findByRg(
      subscriber.rg,
    )) as Subscriber;

    expect(confirmedSubscriber.isPaid).toEqual(true);
  });

  it("should not confirm a payment if subscriber doesn't exist", async () => {
    await expect(
      confirmPayment.execute({
        email: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import IMailProvider from '@shared/container/providers/MailProvider/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import Subscriber from '../entities/Subscriber';
import ISubscribersRepository from '../repositories/ISubscribersRepository';

interface IRequest {
  cpf?: string;
  rg?: string;
  email?: string;
}

@injectable()
export default class ConfirmPaymentService {
  constructor(
    @inject('SubscribersRepository')
    private subscribersRepository: ISubscribersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ cpf, rg, email }: IRequest): Promise<void> {
    let subscriber: Subscriber | undefined;

    if (email) subscriber = await this.subscribersRepository.findByEmail(email);
    if (cpf) subscriber = await this.subscribersRepository.findByCpf(cpf);
    if (rg) subscriber = await this.subscribersRepository.findByRg(rg);

    if (!subscriber) throw new AppError("Subscriber doesn't exist");

    subscriber.isPaid = true;
    subscriber.paidAt = new Date();

    await this.subscribersRepository.save(subscriber);

    const paymentConfirmation = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'confirm-payment.hbs',
    );

    this.mailProvider.sendMail({
      to: {
        name: subscriber.name,
        email: subscriber.email,
      },
      subject: 'Pagamento da IV SEEL confirmado',
      templateData: {
        file: paymentConfirmation,
        variables: {
          name: subscriber.name,
        },
      },
    });
  }
}

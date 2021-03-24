import { container } from 'tsyringe';

import IMailTemplateProvider from './IMailTemplateProvider';

import HbsMailTemplateProvider from './implementations/HbsMailTemplateProvider';

const providers = {
  handlebars: HbsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);

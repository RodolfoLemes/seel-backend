interface IMailConfig {
  driver: 'ethereal' | 'ses';

  host: string;
  port: number;

  auth: {
    user: string;
    pass: string;
  };

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  host: process.env.MAIL_HOST || '',
  port: process.env.MAIL_PORT || 100,
  auth: {
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  },

  defaults: {
    from: {
      email: 'ivseeluem@gmail.com',
      name: 'IEEE UEM - IV SEEL',
    },
  },
} as IMailConfig;

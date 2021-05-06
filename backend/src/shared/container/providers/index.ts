import { container } from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from './CacheProvider/models/ICacheProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  process.env.STORAGE_DRIVER == 'disk' ? DiskStorageProvider : S3StorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider
);

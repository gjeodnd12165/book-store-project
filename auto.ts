import {
  IConfig,
  ModelBuilder,
  DialectMariaDB,
} from 'sequelize-typescript-generator';

(async () => {
  const config: IConfig = {
    connection: {
      dialect: 'mariadb',
      database: 'BookShop',
      username: 'root',
      password: 'root',
    },
    metadata: {
      indices: true,
      case: 'CAMEL',
    },
    output: {
      clean: true,
      outDir: 'autoModels',
    },
    strict: true,
  };

  const dialect = new DialectMariaDB();

  const builder = new ModelBuilder(config, dialect);

  try {
    await builder.build();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

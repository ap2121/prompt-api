require('dotenv').config()
module.exports = {
  development: {
    database: 'prompt_database',
    dialect: 'postgres'
  },
  test: {
    database: 'prompt_database',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}

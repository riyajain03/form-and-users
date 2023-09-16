const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
   'user_details',
   'root',
   'root',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define("users", {
   user_name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   user_email: {
     type: DataTypes.STRING,
     allowNull: false
   },
   user_password: {
     type: DataTypes.STRING,
     allowNull: false
   },
   user_image: {
     type: DataTypes.STRING,
     allowNull: false
   },
});

sequelize.sync().then(() => {
   console.log('User table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});
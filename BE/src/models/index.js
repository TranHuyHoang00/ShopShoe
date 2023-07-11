'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
const customizeConfig = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
}

sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USERNAME,
    null,
    customizeConfig);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.belongsTo(db.Status, { foreignKey: 'statusId' });
db.Status.hasMany(db.User, { foreignKey: 'statusId' });
db.User.belongsToMany(db.Address, { through: "user_addresses", as: "addresses", foreignKey: "userId", });
db.Address.belongsToMany(db.User, { through: "user_addresses", as: "users", foreignKey: "addressId", });
db.User.belongsToMany(db.Role, { through: "user_roles", as: "roles", foreignKey: "userId", });
db.Role.belongsToMany(db.User, { through: "user_roles", as: "users", foreignKey: "roleId", });

db.Product.belongsTo(db.Type, { foreignKey: 'typeId' });
db.Type.hasMany(db.Product, { foreignKey: 'typeId' });
db.Product.belongsTo(db.Brand, { foreignKey: 'brandId' });
db.Brand.hasMany(db.Product, { foreignKey: 'brandId' });
db.Product.belongsTo(db.Discount, { foreignKey: 'discountId' });
db.Discount.hasMany(db.Product, { foreignKey: 'discountId' });
db.Product.belongsTo(db.Origin, { foreignKey: 'originId' });
db.Origin.hasMany(db.Product, { foreignKey: 'originId' });
db.Product.belongsTo(db.Status, { foreignKey: 'statusId' });
db.Status.hasMany(db.Product, { foreignKey: 'statusId' });
db.Product.belongsToMany(db.Image, { through: "product_images", as: "images", foreignKey: "productId", });
db.Image.belongsToMany(db.Product, { through: "product_images", as: "products", foreignKey: "imageId", });
db.Product.hasMany(db.Detail, { foreignKey: 'productId' });
db.Detail.belongsTo(db.Product, { foreignKey: 'productId' });

db.Color.hasMany(db.Detail, { foreignKey: 'colorId' });
db.Detail.belongsTo(db.Color, { foreignKey: 'colorId' });
db.Size.hasMany(db.Detail, { foreignKey: 'sizeId' });
db.Detail.belongsTo(db.Size, { foreignKey: 'sizeId' });

db.Detail.hasMany(db.Cart, { foreignKey: 'productId' });
db.Cart.belongsTo(db.Detail, { foreignKey: 'productId' });

db.Status.hasMany(db.Order, { foreignKey: 'statusId' });
db.Order.belongsTo(db.Status, { foreignKey: 'statusId' });
db.Payment.hasMany(db.Order, { foreignKey: 'paymentId' });
db.Order.belongsTo(db.Payment, { foreignKey: 'paymentId' });

db.User_address.hasMany(db.Order, { foreignKey: 'customerId' });
db.Order.belongsTo(db.User_address, { foreignKey: 'customerId' });

db.User.hasMany(db.Order, { foreignKey: 'staffId' });
db.Order.belongsTo(db.User, { foreignKey: 'staffId' });

db.User.hasMany(db.User_address, { foreignKey: 'userId' });
db.User_address.belongsTo(db.User, { foreignKey: 'userId' });
db.Address.hasMany(db.User_address, { foreignKey: 'addressId' });
db.User_address.belongsTo(db.Address, { foreignKey: 'addressId' });

db.Detail.hasMany(db.Order_detail, { foreignKey: 'productId' });
db.Order_detail.belongsTo(db.Detail, { foreignKey: 'productId' });

module.exports = db;

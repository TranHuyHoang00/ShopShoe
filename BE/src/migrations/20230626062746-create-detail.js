'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      colorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Colors",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      sizeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Sizes",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Details');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "User_addresses",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      staffId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Payments",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      total: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Statuses",
          key: "id"
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Orders');
  }
};
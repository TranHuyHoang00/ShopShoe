'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      brandId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      discountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Discounts",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      originId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Origins",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Types",
          key: "id"
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Products');
  }
};
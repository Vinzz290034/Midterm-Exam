const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

// Step 1: Set up Sequelize
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Error connecting to the database:', err));

// Step 2: Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

// Step 3: Set up the /users route
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Step 4: Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await sequelize.sync(); // Sync database if necessary
        console.log('Database synced!');
    } catch (err) {
        console.error('Failed to sync database:', err);
    }
});

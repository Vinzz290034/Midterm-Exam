const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')

const app = express()
const PORT = 3000

// Step 1: Set up Sequelize
const sequelize = new Sequelize('Midterm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
    console.error('Error details:', err.original); // Log the original error if available
  });

// Step 2: Define the User model
const users = sequelize.define('users', {
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
});

// Step 3: Set up the /users route
app.get('/users', async (req, res) => {
    try {
        const allUsers = await users.findAll()
        res.json(allUsers)
    } catch (err) {
        console.error('Error fetching users:', err)
        res.status(500).send('Internal Server Error')
    }
});

// Step 4: Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    try {
        await sequelize.sync(); // Sync database if necessary
        console.log('Database synced!');
    } catch (err) {
        console.error('Failed to sync database:', err)
    }
});

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');

let token;
let userId;

beforeAll(async () => {
    const url = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/pfm_test_transaction';
    await mongoose.connect(url);

    // Create a user and get a token
    const user = await User.create({
        name: 'Test User',
        email: 'trans@example.com',
        password: 'password123'
    });
    userId = user._id;
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_super_secret_key', { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Transaction API', () => {
    it('should create a new transaction', async () => {
        const res = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 100,
                type: 'expense',
                category: 'Food',
                description: 'Lunch'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body.amount).toEqual(100);
    });

    it('should get all transactions for a user', async () => {
        const res = await request(app)
            .get('/api/transactions')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

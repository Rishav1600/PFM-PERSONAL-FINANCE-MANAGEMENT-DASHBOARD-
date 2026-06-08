const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plaidAccountId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    officialName: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    subtype: {
        type: String
    },
    balance: {
        current: {
            type: Number,
            required: true
        },
        available: {
            type: Number
        },
        limit: {
            type: Number
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },
    mask: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);

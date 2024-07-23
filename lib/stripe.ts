import Stripe from 'stripe';

export const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

'use server'

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const createConnectedAccount = async () => {
  const account =  await stripe.accounts.create({
    controller: {
      stripe_dashboard: {
        type: "express",
      },
      fees: {
        payer: "application",
      },
      losses: {
        payments: "application",
      },
    },
  } as any);

  return account.id;
};

export const createAccountLink = async () => {
  const accountLink = await stripe.accountLinks.create({
    account: 'acct_1Pfa5wIEZygHxzYU',
    refresh_url: 'http://localhost:3000',
    return_url: 'http://localhost:3000',
    type: "account_onboarding",
  });
  console.log(accountLink.url);
  

  return accountLink.url;
};

export const createCustomer = async () => {

  const customer = await stripe.customers.create();

  const customerId = customer.id;
  
  console.log(customerId);
  
};

export const redirectToCheckoutSession = async () => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    customer: 'cus_QWest0u1AnxDeJ',
    payment_intent_data: {
      application_fee_amount: 123,
      transfer_data: {
        destination: 'acct_1Pfa5wIEZygHxzYU',
      },
    },
    mode: 'payment',
    success_url: 'http://localhost:3000',
  });

  redirect(session.url as string);
}

export const redirectToCustomerPortal = async () => {
  const session = await stripe.billingPortal.sessions.create({
    customer: 'cus_QWest0u1AnxDeJ',
  })
  redirect(session.url);
}
export const redirectToConnectedAccountDashboard = async () => {
  const session = await stripe.accounts.createLoginLink('acct_1Pfa5wIEZygHxzYU');
  
  redirect(session.url);
}
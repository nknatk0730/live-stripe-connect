import { createAccountLink, createConnectedAccount, createCustomer, redirectToCheckoutSession, redirectToConnectedAccountDashboard, redirectToCustomerPortal } from "@/actions/stripe";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h2>supplier</h2>
      <form action={createConnectedAccount}>
        <Button>connected account</Button>
      </form>
      <form action={createAccountLink}>
        <Button>get Account link</Button>
      </form>
      <h2>customer</h2>
      <form action={createCustomer}>
        <Button>create customer Account</Button>
      </form>
      <form action={redirectToCheckoutSession}>
        <Button>Buy</Button>
      </form>
      <form action={redirectToCustomerPortal}>
        <Button>customer portal</Button>
      </form>
      <form action={redirectToConnectedAccountDashboard}>
        <Button>supplier dashboard</Button>
      </form>
    </main>
  );
}

# x402-express-mantle

Express middleware for x402 payment protocol, optimized for Mantle testnet with USDC Token support.

## Features

- ✅ **Mantle Testnet Optimized**: Pre-configured for Mantle testnet (`eip155:5003`)
- ✅ **USDC Token Support**: Uses correct USDC Token contract with version 1 EIP-712 domain
- ✅ **Express Integration**: Seamless Express.js middleware integration
- ✅ **Zero Configuration**: Just import and use - no complex setup needed
- ✅ **Vercel Compatible**: Works perfectly with serverless deployment

## Installation

```bash
npm install x402-express-mantle
```

## Quick Start

```javascript
import express from 'express';
import { paymentMiddlewareFromConfig } from 'x402-express-mantle';
import { ExactEvmScheme } from '@x402/evm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';

const app = express();

// Replace with your facilitator URL
const facilitatorClient = new HTTPFacilitatorClient({ 
  url: 'https://your-facilitator-url.com' 
});

// Routes that require payment on Mantle testnet
const routes = {
  'GET /weather': {
    accepts: [{
      scheme: 'exact',
      price: '$0.001',
      network: 'eip155:5003', // Mantle testnet
      payTo: '0xYourWalletAddress'
    }],
    description: 'Weather data',
    mimeType: 'application/json'
  }
};

// Configure payment schemes for Mantle
const schemes = [{
  network: 'eip155:5003', // Mantle testnet
  server: new ExactEvmScheme()
}];

// Add payment middleware
app.use(paymentMiddlewareFromConfig(
  routes,
  facilitatorClient,
  schemes
));

// Your protected route
app.get('/weather', (req, res) => {
  res.json({
    temperature: 72,
    conditions: 'sunny',
    location: 'Mantle Testnet'
  });
});

app.listen(3000);
```

## Mantle Testnet Configuration

This package includes pre-configured settings for Mantle testnet:

- **Network**: `eip155:5003`
- **USDC Contract**: `0x3D884Eca2a1E65A41Cd54b1CF55537dAe35d7BDC`
- **Token Name**: `USDC Token` (for EIP-712 signing)
- **Version**: `1` (EIP-712 domain version)

## API

This package re-exports all functions from `@x402/express`:

- `paymentMiddleware(routes, server, paywallConfig?, paywall?, syncFacilitatorOnStart?)`
- `paymentMiddlewareFromConfig(routes, facilitatorClients?, schemes?, paywallConfig?, paywall?, syncFacilitatorOnStart?)`
- `x402ResourceServer`, `x402HTTPResourceServer`
- All types and utilities

## Environment Variables

Set these for your payment server:

```bash
# Your facilitator URL
FACILITATOR_URL=https://your-facilitator.com

# Wallet address to receive payments
EVM_ADDRESS=0xYourWalletAddress
```

## Examples

Check the `examples/` directory for complete working examples:

```bash
cd examples
npm install
npm start
```

## Deployment

### Vercel

This package works perfectly with Vercel:

```bash
npm install x402-express-mantle
# Deploy to Vercel with your environment variables
```

### Other Platforms

Works with any Node.js platform that supports Express.js.

## Important Notes

- **Facilitator Required**: You need a running x402 facilitator that supports Mantle testnet
- **USDC Token**: The contract uses "USDC Token" as the EIP-712 domain name
- **Version 1**: The contract uses version "1" for EIP-712 signing

## License

Apache-2.0

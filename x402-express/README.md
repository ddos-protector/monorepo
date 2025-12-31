# x402-express-mantle

Complete x402 Express middleware SDK with built-in Mantle testnet support and USDC Token configurations.

## Features

- ✅ **Bundled SDK**: No external dependencies on @x402 packages
- ✅ **Mantle Testnet Ready**: Pre-configured for `eip155:5003` with USDC Token support
- ✅ **EIP-712 Compatible**: Uses "USDC Token" name and version "1" for Mantle contracts
- ✅ **Express Integration**: Seamless Express.js middleware
- ✅ **Zero Configuration**: Works out-of-the-box for Mantle development
- ✅ **TypeScript Support**: Full type definitions included

## Installation

```bash
npm install x402-express-mantle@1.0.6
```

## Quick Start

```javascript
import express from "express";
import { paymentMiddleware, x402ResourceServer } from "x402-express-mantle";
import { ExactEvmScheme } from "x402-evm-mantle";
import { HTTPFacilitatorClient } from "x402-core-mantle/http";

const app = express();

// Connect to your Mantle facilitator
const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://your-mantle-facilitator.com",
});

// Routes with automatic Mantle payment processing
const routes = {
  "GET /premium-data": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:5003", // Mantle testnet (pre-configured)
        payTo: "0xYourMantleWalletAddress",
      },
    ],
    description: "Premium data access",
  },
};

// Configure payment schemes (Mantle support built-in)
const schemes = [
  {
    network: "eip155:5003", // Mantle testnet
    server: new ExactEvmScheme(),
  },
];

// Add payment middleware
app.use(
  paymentMiddleware(
    routes,
    new x402ResourceServer(facilitatorClient).register(
      "eip155:5003",
      new ExactEvmScheme()
    )
  )
);

// Your protected route
app.get("/premium-data", (req, res) => {
  res.json({
    data: "Premium Mantle content!",
    network: "Mantle Testnet",
  });
});

app.listen(3000);
```

## Mantle Testnet Configuration

This SDK includes pre-built configurations for Mantle testnet:

- **Network**: `eip155:5003`
- **USDC Contract**: `0x3D884Eca2a1E65A41Cd54b1CF55537dAe35d7BDC`
- **Token Name**: `USDC Token` (EIP-712 domain name)
- **Version**: `1` (EIP-712 domain version)
- **RPC**: Uses official Mantle testnet endpoints

## API Reference

### `paymentMiddleware(routes, server, paywallConfig?, paywall?, syncFacilitatorOnStart?)`

Direct middleware function using a pre-configured server instance.

### `paymentMiddlewareFromConfig(routes, facilitatorClients?, schemes?, paywallConfig?, paywall?, syncFacilitatorOnStart?)`

Configuration-based middleware that creates the server internally.

### Core Classes

- `x402ResourceServer` - Resource server for advanced configurations
- `x402HTTPResourceServer` - HTTP resource server
- `HTTPFacilitatorClient` - Client for connecting to facilitators
- `ExactEvmScheme` - EVM payment scheme (Mantle-compatible)

## Environment Variables

```bash
# Your facilitator URL (required)
FACILITATOR_URL=https://your-facilitator.com

# Wallet address for receiving payments (required for routes)
EVM_ADDRESS=0xYourMantleWalletAddress
```

## Supported Networks

- **Mantle Testnet** (`eip155:5003`) - Primary support with full configurations
- **Other EVM Networks** - Via standard x402 mechanisms
- **Solana Networks** - Via standard x402 mechanisms

## Examples

Check the `examples/` directory for complete working examples:

```bash
cd examples/express
npm install
npm start
```

## Built-in Mantle Features

This SDK includes custom Mantle configurations:

1. **USDC Token Support**: Pre-configured with correct contract address and EIP-712 parameters
2. **Network Definitions**: Mantle testnet properly defined with chain ID 5003
3. **RPC Endpoints**: Official Mantle testnet RPC configurations
4. **Scheme Support**: EVM exact scheme configured for Mantle

## Deployment

### Vercel

````bash
npm install x402-express-mantle@1.0.6

## Quick Example

```bash
# Try the example server
cd examples/express
npm install
cp .env-local .env
# Edit .env with your facilitator URL and EVM address
npm run dev
````

The example server demonstrates:

- Mantle testnet payment integration
- Multiple pricing tiers ($0.001 and $0.005 USDC)
- Free and paid endpoints
- Complete payment flow

# Deploy to Vercel with your environment variables

```

### Other Platforms

Works with any Node.js platform supporting Express.js.

## Why This Package?

- **No External Dependencies**: Bundled with all x402 functionality
- **Mantle Optimized**: Custom configurations for Mantle ecosystem
- **Developer Friendly**: Zero configuration for Mantle development
- **Production Ready**: Includes all necessary type definitions and examples

## License

Apache-2.0
```

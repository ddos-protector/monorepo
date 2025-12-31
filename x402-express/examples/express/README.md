# x402-express-mantle Example Server

Express.js server demonstrating how to protect API endpoints with a paywall using the `x402-express-mantle` middleware. This example is specifically configured for **Mantle testnet** with built-in USDC token support.

## Features

- ✅ **Mantle Testnet Support** - Pre-configured for `eip155:5003`
- ✅ **USDC Token Payments** - Built-in USDC configuration
- ✅ **Multiple Endpoints** - Weather API with different pricing tiers
- ✅ **Simple Setup** - Just `npm install` and configure environment

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env-local .env

# Edit .env with your values
# FACILITATOR_URL=https://your-facilitator.vercel.app
# EVM_ADDRESS=0x...

# Run the server
npm run dev
```

## Prerequisites

- Node.js v18+ (install via [nvm](https://github.com/nvm-sh/nvm))
- npm v8+ (comes with Node.js)
- EVM address for receiving payments on Mantle testnet
- Deployed x402 facilitator (see [facilitator setup](../..))

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env-local` to `.env`:

```bash
cp .env-local .env
```

Fill in the required environment variables:

- `FACILITATOR_URL` - URL of your deployed facilitator
- `EVM_ADDRESS` - Your EVM address to receive payments
- `PORT` - Optional port (default: 3000)

### 3. Deploy Facilitator First

Before running this server, you need a facilitator. Use the standalone facilitator from this repo:

```bash
cd ../facilitator
# Configure and deploy to Vercel
```

### 4. Run the Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Endpoints

### Free Endpoints

- `GET /health` - Health check (no payment required)

### Paid Endpoints

- `GET /weather` - Current weather ($0.001 USDC)
- `GET /forecast` - 5-day forecast ($0.005 USDC)

All paid endpoints require payment on **Mantle testnet** (`eip155:5003`) using **USDC**.

## Testing the API

### Using cURL

1. **Try free endpoint:**
```bash
curl http://localhost:3000/health
```

2. **Try paid endpoint (will return 402 Payment Required):**
```bash
curl http://localhost:3000/weather
```

3. **Make payment and get data:**
Use the facilitator to process payments, then include the payment token:
```bash
curl -H "Authorization: Bearer <payment-token>" http://localhost:3000/weather
```

### Using JavaScript Client

```javascript
import { paymentMiddlewareFromConfig } from 'x402-express-mantle';
import { HTTPFacilitatorClient } from 'x402-express-mantle';

// Create facilitator client
const facilitator = new HTTPFacilitatorClient({
  url: 'https://your-facilitator.vercel.app'
});

// Make a paid request
const response = await fetch('http://localhost:3000/weather');

// If 402, process payment
if (response.status === 402) {
  const paymentRequired = response.headers.get('payment-required');
  // Process payment using facilitator...
  // Then retry with payment token
}
```

## Payment Flow

1. **Client requests protected endpoint** → Server returns `402 Payment Required`
2. **Client processes payment requirements** → Contacts facilitator for verification
3. **Facilitator verifies payment** → Returns signed authorization
4. **Client retries request** → Includes payment token in `Authorization` header
5. **Server validates payment** → Serves content if valid

## Configuration

The server uses `paymentMiddlewareFromConfig` with:

```javascript
{
  facilitatorClient: new HTTPFacilitatorClient({ url: facilitatorUrl }),
  routes: {
    "GET /weather": {
      accepts: [{
        scheme: "exact",
        price: "$0.001",
        network: "eip155:5003", // Mantle testnet
        payTo: evmAddress,
      }],
      description: "Weather data",
      mimeType: "application/json",
    }
  },
  schemes: [
    new ExactEvmScheme({
      networks: ["eip155:5003"] // Mantle testnet only
    })
  ]
}
```

## Response Examples

### Payment Required (402)

```json
{
  "x402Version": 2,
  "error": "Payment required",
  "resource": {
    "url": "http://localhost:3000/weather",
    "description": "Weather data for Mantle testnet",
    "mimeType": "application/json"
  },
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:5003",
    "amount": "1000",
    "asset": "0x3D884Eca2a1E65A41Cd54b1CF55537dAe35d7BDC",
    "payTo": "0x...",
    "maxTimeoutSeconds": 300,
    "extra": {
      "name": "USDC Token",
      "version": "1"
    }
  }]
}
```

### Successful Response (200)

```json
{
  "report": {
    "weather": "sunny",
    "temperature": 72,
    "humidity": 45,
    "location": "Mantle Testnet"
  }
}
```

## Customization

### Adding More Endpoints

```javascript
app.use(
  paymentMiddlewareFromConfig({
    // ... existing config
    routes: {
      // ... existing routes
      "GET /premium": {
        accepts: [{
          scheme: "exact",
          price: "$0.01",
          network: "eip155:5003",
          payTo: evmAddress,
        }],
        description: "Premium weather data",
        mimeType: "application/json",
      }
    }
  })
);

app.get("/premium", (req, res) => {
  res.json({ premium: "data" });
});
```

### Adding More Networks

```javascript
schemes: [
  new ExactEvmScheme({
    networks: ["eip155:5003", "eip155:5000"] // Mantle testnet + mainnet
  })
]
```

## Troubleshooting

### Common Issues

1. **"Cannot find module 'x402-express-mantle'"**
   - Run `npm install` to install dependencies

2. **"FACILITATOR_URL is required"**
   - Set `FACILITATOR_URL` in your `.env` file
   - Make sure your facilitator is deployed and accessible

3. **"EVM_ADDRESS is required"**
   - Set `EVM_ADDRESS` in your `.env` file
   - Use a valid EVM address that can receive USDC on Mantle testnet

4. **Payment verification fails**
   - Check facilitator logs
   - Ensure facilitator is configured for Mantle testnet
   - Verify USDC balance and approvals

### Logs

The server provides detailed logging:
- Payment verification attempts
- Settlement transactions
- Network information
- Payment addresses

## Next Steps

- **Deploy to production** - Use Vercel, Railway, or similar
- **Add authentication** - Combine with JWT or API keys
- **Database integration** - Store user data and payment history
- **Rate limiting** - Prevent abuse while maintaining paywall
- **Custom pricing** - Dynamic pricing based on usage/content

## Support

- 📖 [x402 Documentation](https://docs.x402.org)
- 💬 [Discord Community](https://discord.gg/x402)
- 🐛 [GitHub Issues](https://github.com/x402-org/x402/issues)

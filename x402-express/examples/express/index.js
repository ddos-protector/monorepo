import { config } from 'dotenv';
import express from 'express';
import { paymentMiddleware, x402ResourceServer } from 'x402-express-mantle';
import { ExactEvmScheme } from 'x402-evm-mantle';
import { HTTPFacilitatorClient } from 'x402-core-mantle/http';

config();

const evmAddress = process.env.EVM_ADDRESS;
if (!evmAddress) {
  console.error('❌ Missing required environment variables: EVM_ADDRESS');
  console.error('Please set EVM_ADDRESS in your .env file');
  process.exit(1);
}

const facilitatorUrl = process.env.FACILITATOR_URL;
if (!facilitatorUrl) {
  console.error('❌ FACILITATOR_URL environment variable is required');
  console.error('Please set FACILITATOR_URL in your .env file');
  process.exit(1);
}

const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });

const app = express();

// Configure payment middleware with Mantle testnet support
app.use(
  paymentMiddleware(
    {
      'GET /weather': {
        accepts: [
          {
            scheme: 'exact',
            price: '$0.001',
            network: 'eip155:5003', // Mantle testnet
            payTo: evmAddress,
          },
        ],
        description: 'Weather data for Mantle testnet',
        mimeType: 'application/json',
      },
      'GET /forecast': {
        accepts: [
          {
            scheme: 'exact',
            price: '$0.005',
            network: 'eip155:5003', // Mantle testnet
            payTo: evmAddress,
          },
        ],
        description: '5-day weather forecast',
        mimeType: 'application/json',
      },
    },
    new x402ResourceServer(facilitatorClient).register(
      'eip155:5003',
      new ExactEvmScheme()
    )
  )
);

// Weather endpoint - requires $0.001 USDC payment on Mantle testnet
app.get('/weather', (req, res) => {
  res.json({
    report: {
      weather: 'sunny',
      temperature: 72,
      humidity: 45,
      location: 'Mantle Testnet',
    },
  });
});

// Forecast endpoint - requires $0.005 USDC payment on Mantle testnet
app.get('/forecast', (req, res) => {
  res.json({
    forecast: [
      { day: 'Monday', weather: 'sunny', high: 75, low: 55 },
      { day: 'Tuesday', weather: 'partly cloudy', high: 73, low: 54 },
      { day: 'Wednesday', weather: 'rainy', high: 68, low: 52 },
      { day: 'Thursday', weather: 'sunny', high: 76, low: 56 },
      { day: 'Friday', weather: 'sunny', high: 78, low: 58 },
    ],
    location: 'Mantle Testnet',
  });
});

// Health check endpoint (free)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    network: 'Mantle Testnet (eip155:5003)',
    paymentRequired: false,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 x402-express-mantle Example Server`);
  console.log(`📍 Server listening at http://localhost:${PORT}`);
  console.log(`🌐 Network: Mantle Testnet (eip155:5003)`);
  console.log(`💰 Payment Address: ${evmAddress}`);
  console.log(`🔗 Facilitator: ${facilitatorUrl}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`  GET /health - Free health check`);
  console.log(`  GET /weather - $0.001 USDC (Weather data)`);
  console.log(`  GET /forecast - $0.005 USDC (5-day forecast)`);
});

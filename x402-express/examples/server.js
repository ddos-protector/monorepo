import express from 'express';
import { paymentMiddlewareFromConfig } from 'x402-express-mantle';
import { ExactEvmScheme } from '@x402/evm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';

const app = express();

// Replace with your facilitator URL
const facilitatorClient = new HTTPFacilitatorClient({ 
  url: process.env.FACILITATOR_URL || 'http://localhost:4022'
});

// Routes that require payment on Mantle testnet
const routes = {
  'GET /weather': {
    accepts: [{
      scheme: 'exact',
      price: '$0.001',
      network: 'eip155:5003', // Mantle testnet
      payTo: process.env.EVM_ADDRESS || '0xYourWalletAddress'
    }],
    description: 'Weather data',
    mimeType: 'application/json'
  },
  'POST /premium-api': {
    accepts: [{
      scheme: 'exact', 
      price: '$0.01',
      network: 'eip155:5003', // Mantle testnet
      payTo: process.env.EVM_ADDRESS || '0xYourWalletAddress'
    }],
    description: 'Premium API access'
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

// Protected routes
app.get('/weather', (req, res) => {
  res.json({
    temperature: 72,
    conditions: 'sunny',
    location: 'Mantle Testnet'
  });
});

app.post('/premium-api', (req, res) => {
  res.json({
    message: 'Premium API access granted!',
    data: { premium: true }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', network: 'mantle-testnet' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mantle x402 server running on port ${PORT}`);
  console.log('Supported routes:');
  console.log('- GET /weather (requires payment)');
  console.log('- POST /premium-api (requires payment)'); 
  console.log('- GET /health (free)');
});

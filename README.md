# Mantle Monorepo

A monorepo containing multiple packages and submodules for the Mantle project.

## Structure

```
.
├── facilitator/          # Facilitator code
├── usdc-faucet/          # USDC Faucet 
├── express-example-server/
├── x402-mantle/          # (submodule) x402 Mantle Support
├── scrapper/             # (submodule) Scrapper service
├── x402-ratelimiter/     # (submodule) x402 Rate Limiter
├── mcp/                  # (submodule) MCP
└── scripts/              # Setup and utility scripts
```

## Getting Started

### Prerequisites

- Node.js
- pnpm (v9.15.0 or later)
- Git

### Installation

Clone the repository with submodules:

```bash
git clone --recurse-submodules https://github.com/ddos-protector/monorepo.git
cd monorepo
```

Or if you've already cloned without submodules:

```bash
pnpm run setup
```

This will initialize all submodules and install dependencies.

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm run setup` | Initialize submodules and install all dependencies |
| `pnpm run setup:submodules` | Initialize and update git submodules only |
| `pnpm run install:all` | Install all pnpm dependencies |
| `pnpm run build:all` | Build all packages |
| `pnpm run dev` | Run all packages in development mode |
| `pnpm run start` | Start all packages |

### USDC Faucet

| Script | Description |
|--------|-------------|
| `pnpm run faucet` | Run faucet in dev mode |
| `pnpm run faucet:install` | Install faucet dependencies |
| `pnpm run faucet:build` | Build faucet package |
| `pnpm run faucet:start` | Start faucet |

## Submodules

This repository includes the following git submodules:

- **x402-mantle**: https://github.com/ddos-protector/x402-mantle.git
- **scrapper**: https://github.com/vwakesahu/scrapper.git
- **x402-ratelimiter**: https://github.com/weshallsah/x402-ratelimiter
- **mcp**: https://github.com/ddos-protector/mcp.git

To update submodules to their latest commits:

```bash
git submodule update --remote
```



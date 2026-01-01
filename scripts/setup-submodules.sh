#!/bin/bash

# Script to initialize and update all git submodules

set -e

echo "Initializing git submodules..."
git submodule init

echo "Updating git submodules..."
git submodule update --init --recursive

echo "Submodules setup complete!"
echo ""
echo "Submodules installed:"
git submodule status

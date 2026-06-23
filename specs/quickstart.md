# Quick Start Guide: Secure Document Upload & Management

## Prerequisites
- .NET 8.0 or later
- Azure subscription
- SQL Server 2019+
- Node.js 18+ (for frontend, if applicable)

## Setup Instructions

### 1. Clone & Install Dependencies
```bash
cd ContosoDashboard
dotnet restore
npm install  # if frontend exists

# Set Azure subscription
az account set --subscription "your-subscription-id"

# Create resource group
az group create --name contoso-rg --location eastus

# Create Blob Storage
az storage account create \
  --name contosostorage \
  --resource-group contoso-rg \
  --location eastus

# Create SQL Database
az sql server create \
  --name contoso-sqlserver \
  --resource-group contoso-rg \
  --admin-user sqladmin \
  --admin-password YourSecurePassword!

az sql db create \
  --name ContosoDashboard \
  --server contoso-sqlserver \
  --resource-group contoso-rg

  # Copy example config
cp .env.example .env

# Edit .env with your values
nano .env

AZURE_STORAGE_CONNECTION_STRING=...
SQL_SERVER_CONNECTION_STRING=...
AZURE_AD_TENANT_ID=...
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...

# Run migrations
dotnet ef database update

# Seed initial data (optional)
dotnet run --seed

# Development
dotnet run

# Production
dotnet publish -c Release
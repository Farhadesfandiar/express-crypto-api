# Application Documentation

## Overview
This application is a Dockerized Node.js application that uses **Express.js** for the backend server and **MongoDB** as the database. It integrates with the **Tatum API** to interact with blockchain data. 

## Features
- **Express.js**: Backend server for handling API requests.
- **MongoDB**: Database for storing and managing application data.
- **Tatum API**: Third-party API for blockchain interactions.
- **Dockerized Environment**: Simplifies deployment and isolates the application from the host environment.

## Prerequisites
- Docker installed on your system.
- 
## Application Details

### **Ports**
- The application is exposed on port **3000**.
- MongoDB is exposed on port **27017**.

### **API Endpoints**
1. **Get Token Balance**:
    - **URL**: `/api/token-balance`
    - **Method**: `POST`
    - **Request Body**:
      ```json
      {
        "tokenContractAddress": "<ERC-20 token contract address>",
        "walletAddress": "<Wallet address>",
        "decimals": <Number of decimals for the token>
      }
      ```
    - **Response**:
      ```json
      {
        "balance": <Token balance in human-readable format>
      }
      ```

2. **Fetch Transactions of Given Account Address (via API)**:
    - **URL**: `/api/transactions/:account`
    - **Method**: `GET`
    - **Description**: Fetches transactions of a given account address using Tatum API and records them in the database.
    - **Response**:
      ```json
      [
        {
          "transactionHash": "<Transaction Hash>",
          "from": "<Sender Address>",
          "to": "<Receiver Address>",
          "value": <Amount in Wei>,
          "gas": <Gas Used>
        }
      ]
      ```

3. **Fetch Transactions of Given Account Address (from Database)**:
    - **URL**: `/api/transactions/db/:account`
    - **Method**: `GET`
    - **Description**: Retrieves transactions of a given account address from the database.
    - **Response**:
      ```json
      [
        {
          "transactionHash": "<Transaction Hash>",
          "from": "<Sender Address>",
          "to": "<Receiver Address>",
          "value": <Amount in Wei>,
          "gas": <Gas Used>
        }
      ]
      ```

4. **Fetch Account Balance (via API)**:
    - **URL**: `/api/account/balance/:account`
    - **Method**: `GET`
    - **Description**: Fetches the balance of a given account address using Tatum API.
    - **Response**:
      ```json
      {
        "balance": <Account Balance in Wei>
      }
      ```

### **Docker Services**
- **App Container**:
    - Runs the Express.js application.
    - Exposed on port **3000**.
- **MongoDB Container**:
    - MongoDB database service.
    - Exposed on port **27017**.

## Steps to Run the Application

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Build and Start the Containers
Use Docker Compose to build and start the application:
```bash
docker-compose up --build
```
This will:
- Build the `zapper-app` container with the Express.js application.
- Start the `zapper-mongo` container for MongoDB.

### 3. Access the Application
- The application will be accessible at `http://localhost:3000`.

### 4. Test the API Endpoints
Use a tool like Postman or `curl` to test the API endpoints.

**Example**:
To test the token balance endpoint:
```bash
curl --location --request POST 'http://localhost:3000/api/token-balance' \
--header 'Content-Type: application/json' \
--data-raw '{
  "tokenContractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "walletAddress": "0x2F4Ed600108B4DD6Ec2676b8825DEb71587EB467",
  "decimals": 6
}'
```

### Author
This project is developed by Ali Esfandiar.

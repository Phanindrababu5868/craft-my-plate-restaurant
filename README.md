# Craft my plate Restaurant  API

This is a backend-only application to manage users, restaurants, orders, and real-time order status.

## Requirements

- Node.js
- Expressjs
- MongoDB

## Setup

-   Clone the repository
-   Install dependencies: `npm install`
- Set up your environment variables in a `.env` file
 - Start MongoDB server
 -  Start the app: `npm run dev`
 - Use Postman or any API client to interact with the API

## API Endpoints

### User Authentication
- `POST /api/register`: Register a new user
- `POST /api/login`: Login and get JWT token

### User Profile
- `GET /api/profile`: Get user profile (requires JWT)
- `PUT /api/profile`: Update user profile (requires JWT)
- `PUT /api/profile/address`: adds new address user profile (requires JWT)

### Restaurant Management
- `POST /api/restaurants`: Create a new restaurant
- `PUT /api/restaurants/:restaurantId`: Update restaurant details
- `POST /api/restaurants/:restaurantId/menu`: Add a menu item
- `PUT /api/restaurants/:restaurantId/menu/:itemId`: Update a menu item

### Order Management
- `POST /api/orders`: Place a new order (requires JWT)
- `GET /api/orders/:orderId`: Get order details (requires JWT)
- `PUT /api/orders/:orderId/status`: Update order status (requires JWT)
- `GET /api/orders`: List user orders (requires JWT)

you can find more details and examples in this [documention](https://documenter.getpostman.com/view/22472618/2sAXxMhEVj) 

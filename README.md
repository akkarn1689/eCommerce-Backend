
# E-Commerce Backend

## Features

- **User Authentication and Authorization:** Secure sign-up and sign-in processes with role-based access control, allowing for clear distinction between customer and administrator privileges.
- **Product Management:** A full suite of CRUD operations for products, enabling administrators to add, update, remove, and retrieve products with ease.
- **Order Processing:** Robust order management system that allows customers to place orders, and admins to process them through a streamlined workflow.
- **Shopping Cart:** Persistent shopping cart functionality, complete with add-to-cart, update quantities, and remove items features.
- **Payments Integration:** Integration with payment gateways like Stripe for handling transactions and supporting various payment methods.
- **Discounts and Coupons:** Dynamic coupon creation and application system to offer discounts and promotions to customers.
- **Reviews and Ratings:** Users can leave reviews and rate products, fostering community engagement and providing valuable feedback.
- **Wishlist:** Customers can create and manage wishlists, bookmarking their favorite items for future purchase.
- **Scalable Architecture:** Designed with best practices in mind, ensuring that the backend can scale with the growing needs of the business.


Set up your environment variables in a `.env` file:

```env
MODE=dev
MONGO_URL=mongodb://localhost:27017/Ecommerce-App
BASE_URL=http://localhost:3000/
```

## Running the Server

```bash
npm start
```

## Running Swagger API Documentation

```
http://localhost:3000/api-docs/
```

## API Endpoints

### Authentication
- POST `/signup`: Register a new user.
- POST `/signin`: Login for existing users.

### Address Management
- PATCH `/address`: Update an address for a user.
- DELETE `/address`: Remove an address for a user.
- GET `/address`: Retrieve all addresses for a user.

### Brand Management
- POST `/brand`: Add a new brand (admin).
- GET `/brand`: List all brands.
- PUT `/brand/:id`: Update a brand (admin).
- DELETE `/brand/:id`: Delete a brand (admin).

### Cart Management
- POST `/cart`: Add a product to the cart.
- GET `/cart`: Get the user's cart.
- POST `/cart/apply-coupon`: Apply a coupon to the cart.
- DELETE `/cart/:id`: Remove a product from the cart.
- PUT `/cart/:id`: Update product quantity in the cart.

### Category Management
- POST `/category`: Add a new category (admin).
- GET `/category`: List all categories.
- PUT `/category/:id`: Update a category (admin).
- DELETE `/category/:id`: Delete a category (admin).

### Coupon Management
- POST `/coupon`: Create a new coupon (admin/user).
- GET `/coupon`: List all coupons.
- PUT `/coupon/:id`: Update a coupon (admin/user).
- DELETE `/coupon/:id`: Delete a coupon (admin/user).
- GET `/coupon/:id`: Retrieve a specific coupon.

### Order Management
- POST `/order/:id`: Create a cash order (user).
- GET `/order`: Get a specific order (user).
- POST `/order/checkOut/:id`: Create a checkout session (user).
- GET `/order/all`: List all orders.

### Product Management
- POST `/product`: Add a new product (admin/user).
- GET `/product`: List all products.
- PUT `/product/:id`: Update a product (admin).
- DELETE `/product/:id`: Delete a product (admin).
- GET `/product/:id`: Retrieve a specific product.

### Review Management
- POST `/review`: Add a new review (user).
- GET `/review`: List all reviews.
- PUT `/review/:id`: Update a review (user).
- DELETE `/review/:id`: Delete a review (admin/user).

### Subcategory Management
- POST `/subcategory`: Add a new subcategory (admin/user).
- GET `/subcategory`: List all subcategories.
- PUT `/subcategory/:id`: Update a subcategory (admin/user).
- DELETE `/subcategory/:id`: Delete a subcategory (admin/user).

### User Management
- POST `/user`: Add a new user.
- GET `/user`: List all users.
- PUT `/user/:id`: Update a user.
- DELETE `/user/:id`: Delete a user.
- PATCH `/user/:id`: Change a user's password.

### Wishlist Management
- PATCH `/wishlist`: Add to wishlist (user).
- DELETE `/wishlist`: Remove from wishlist (user).
- GET `/wishlist`: Get all items in a user's wishlist.

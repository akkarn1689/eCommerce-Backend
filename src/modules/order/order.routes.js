import express from "express";
// import { validate } from "../../middlewares/validate.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as order from "../order/order.controller.js"
const orderRouter = express.Router();



orderRouter
  .route("/:id")
  .post(
    protectedRoutes,
    allowedTo("user"),
    order.createCashOrder
  )
orderRouter
  .route("/")
  .get(
    protectedRoutes,
    allowedTo("user"),
    order.getSpecificOrder
  )

orderRouter.post('/checkOut/:id', protectedRoutes, allowedTo("user"), order.createCheckOutSession)

orderRouter.get('/all', order.getAllOrders)
export default orderRouter;



//
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   post:
 *     summary: Create a cash order
 *     description: This endpoint allows a user to create an order with cash payment method.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The cart ID to create the order from
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Shipping address and other details for the order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 description: Shipping address for the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 order:
 *                   type: object
 *                   description: The created order
 *       404:
 *         description: Cart ID not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get a specific user's order
 *     description: This endpoint retrieves a specific user's order based on their user ID.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 order:
 *                   type: object
 *                   description: The retrieved order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/orders/all:
 *   get:
 *     summary: Get all orders
 *     description: This endpoint retrieves all orders in the system.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: An individual order object
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/orders/checkOut/{id}:
 *   post:
 *     summary: Create a checkout session with Stripe
 *     description: This endpoint creates a Stripe checkout session for online payment.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The cart ID to create the checkout session from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully created the checkout session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 sessions:
 *                   type: object
 *                   description: The created Stripe checkout session
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/orders/online:
 *   post:
 *     summary: Handle online payment through Stripe
 *     description: This endpoint handles the Stripe webhook event for a successful online payment.
 *     tags: [Orders]
 *     requestBody:
 *       description: The Stripe webhook event object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The raw event data from Stripe
 *               headers:
 *                 type: object
 *                 additionalProperties: true
 *                 description: The headers from Stripe
 *     responses:
 *       200:
 *         description: Successfully processed the payment
 *       400:
 *         description: Invalid Stripe signature or event
 *       500:
 *         description: Server error
 */

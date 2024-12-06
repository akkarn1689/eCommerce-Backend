import express from "express";
import { validate } from "../../middlewares/validate.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addProductToCartValidation, removeProductFromCart } from "./cart.validation.js";
import * as cart from "../cart/cart.controller.js"
const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user"),
    cart.addProductToCart
  ).get(
    protectedRoutes,
    allowedTo("user"),
    cart.getLoggedUserCart
  )
  cartRouter
  .route("/apply-coupon")
  .post(
    protectedRoutes,
    allowedTo("user"),
    cart.applyCoupon
  )

cartRouter
  .route("/:id")
  .delete(
    protectedRoutes,
    allowedTo("user"),
    cart.removeProductFromCart
  )
  .put(
    protectedRoutes,
    allowedTo("user"),
    cart.updateProductQuantity
  );

export default cartRouter;

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing user cart
 */

/**
 * @swagger
 * /api/v1/carts:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the cart
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *             required:
 *               - productId
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get the logged user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/carts/apply-coupon:
 *   post:
 *     summary: Apply a coupon to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Coupon code to apply
 *             required:
 *               - code
 *     responses:
 *       201:
 *         description: Coupon applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       404:
 *         description: Coupon not found or expired
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cart item ID to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 *
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: New quantity for the product
 *             required:
 *               - quantity
 *     responses:
 *       201:
 *         description: Quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */

import express from "express";
import { validate } from "../../middlewares/validate.js";
import {
  addToWishListValidation,
  deleteFromWishListValidation,
} from "./wishlist.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as wishlist from "../wishlist/wishlist.controller.js";

const wishListRouter = express.Router();

wishListRouter
  .route("/")
  .patch(
    protectedRoutes,
    allowedTo("user"),
    validate(addToWishListValidation),
    wishlist.addToWishList
  )
  .delete(
    protectedRoutes,
    allowedTo("user"),
    validate(deleteFromWishListValidation),
    wishlist.removeFromWishList
  )
  .get(protectedRoutes, allowedTo("user"), wishlist.getAllUserWishList);

export default wishListRouter;


/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Operations related to user's wishlist
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   patch:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID to add to the wishlist
 *                 example: 60c72b2f9b1e8b25a7db45f7
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 addToWishList:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["60c72b2f9b1e8b25a7db45f7", "60b72c5a9b1e8b25a7db45f8"]
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "WishList was not found"
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID to remove from the wishlist
 *                 example: 60c72b2f9b1e8b25a7db45f7
 *     responses:
 *       201:
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 removeFromWishList:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["60b72c5a9b1e8b25a7db45f8"]
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "WishList was not found"
 *   get:
 *     summary: Get all products in the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: List of products in the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 getAllUserWishList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: "60c72b2f9b1e8b25a7db45f7"
 *                       name:
 *                         type: string
 *                         example: "Product Name"
 *                       price:
 *                         type: number
 *                         example: 299.99
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "WishList was not found"
 */

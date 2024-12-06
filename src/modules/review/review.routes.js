import express from "express";
import * as review from "./review.controller.js";
import { validate } from "../../middlewares/validate.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addReviewValidation,
  deleteReviewValidation,
  getSpecificReviewValidation,
  updateReviewValidation,
} from "./review.validation.js";

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user"),
    validate(addReviewValidation),
    review.addReview
  )
  .get(review.getAllReviews);

reviewRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("user"),
    validate(updateReviewValidation),
    review.updateReview
  )
  .get(validate(getSpecificReviewValidation), review.getSpecificReview)
  .delete(
    protectedRoutes,
    allowedTo("admin", "user"),
    validate(deleteReviewValidation),
    review.deleteReview
  );

export default reviewRouter;



/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing product reviews
 */

/**
 * @swagger
 * /api/v1/review:
 *   post:
 *     summary: Add a review for a product
 *     description: Allows users to add a review for a specific product.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the review.
 *               productId:
 *                 type: string
 *                 description: The ID of the product being reviewed.
 *               rate:
 *                 type: number
 *                 default: 1
 *                 description: The rating for the product (from 1 to 5).
 *     responses:
 *       201:
 *         description: Successfully added review.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 addReview:
 *                   type: object
 *                   $ref: '#/components/schemas/Review'
 *       409:
 *         description: The user has already reviewed this product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You created a review before
 *       401:
 *         description: Unauthorized request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

/**
 * @swagger
 * /api/v1/review:
 *   get:
 *     summary: Get all reviews for products
 *     description: Fetch all reviews with pagination and filtering options.
 *     tags: [Reviews]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of reviews per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully fetched all reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: success
 *                 getAllReviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   get:
 *     summary: Get a specific review by ID
 *     description: Fetch a review by its ID.
 *     tags: [Reviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the review.
 *         required: true
 *         schema:
 *           type: string
 *           example: 607c72ef1e9e10b4c9c9d2a0
 *     responses:
 *       200:
 *         description: Successfully fetched the review.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 result:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review was not found
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   put:
 *     summary: Update an existing review
 *     description: Allows users to update their own reviews.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the review to update.
 *         required: true
 *         schema:
 *           type: string
 *           example: 607c72ef1e9e10b4c9c9d2a0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The updated content of the review.
 *               rate:
 *                 type: number
 *                 description: The updated rating for the product.
 *     responses:
 *       201:
 *         description: Successfully updated the review.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 updateReview:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found or user not authorized to update this review.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review was not found or you're not authorized to review this project
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Allows users or admins to delete a review.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the review to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: 607c72ef1e9e10b4c9c9d2a0
 *     responses:
 *       204:
 *         description: Successfully deleted the review.
 *       404:
 *         description: Review not found or you're not authorized to delete this review.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review was not found or you're not authorized to delete this review
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the review.
 *         userId:
 *           type: string
 *           description: The user who wrote the review.
 *         productId:
 *           type: string
 *           description: The product being reviewed.
 *         text:
 *           type: string
 *           description: The content of the review.
 *         rate:
 *           type: number
 *           description: The rating given to the product.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was last updated.
 */

import express from "express";
import * as coupon from "./coupon.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  createCouponValidation,
  deleteCouponValidation,
  getSpecificCouponValidation,
  updateCouponValidation,
} from "./coupon.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const couponRouter = express.Router();

couponRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user", "admin"),
    validate(createCouponValidation),
    coupon.createCoupon
  )
  .get(coupon.getAllCoupons);

couponRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin", "user"),
    validate(updateCouponValidation),
    coupon.updateCoupon
  )
  .delete(
    protectedRoutes,
    allowedTo("user", "admin"),
    validate(deleteCouponValidation),
    coupon.deleteCoupon
  )
  .get(validate(getSpecificCouponValidation), coupon.getSpecificCoupon);

export default couponRouter;


/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: API endpoints for managing coupons
 */

/**
 * @swagger
 * /api/v1/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
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
 *                 description: Unique coupon code
 *                 example: SAVE20
 *               expires:
 *                 type: string
 *                 format: date
 *                 description: Expiry date of the coupon
 *                 example: 2024-12-31
 *               discount:
 *                 type: number
 *                 description: Discount percentage or amount
 *                 example: 20
 *     responses:
 *       201:
 *         description: Coupon successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 createCoupon:
 *                   $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized access
 *
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of all coupons
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
 *                 getAllCoupons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Coupon'
 */

/**
 * @swagger
 * /api/v1/coupons/{id}:
 *   get:
 *     summary: Get details of a specific coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: hex
 *           example: 5f8d0d55b54764421b7160d9
 *         required: true
 *         description: Coupon ID
 *     responses:
 *       200:
 *         description: Coupon details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 getSpecificCoupon:
 *                   $ref: '#/components/schemas/Coupon'
 *                 url:
 *                   type: string
 *                   description: QR code URL
 *       404:
 *         description: Coupon not found
 *
 *   put:
 *     summary: Update a specific coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: hex
 *           example: 5f8d0d55b54764421b7160d9
 *         required: true
 *         description: Coupon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Updated coupon code
 *                 example: SAVE30
 *               expires:
 *                 type: string
 *                 format: date
 *                 description: Updated expiry date
 *                 example: 2025-01-01
 *               discount:
 *                 type: number
 *                 description: Updated discount percentage or amount
 *                 example: 30
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 updateCoupon:
 *                   $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *
 *   delete:
 *     summary: Delete a specific coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: hex
 *           example: 5f8d0d55b54764421b7160d9
 *         required: true
 *         description: Coupon ID
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon deleted
 *       404:
 *         description: Coupon not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Coupon ID
 *           example: 5f8d0d55b54764421b7160d9
 *         code:
 *           type: string
 *           description: Unique coupon code
 *           example: SAVE20
 *         expires:
 *           type: string
 *           format: date
 *           description: Expiry date of the coupon
 *           example: 2024-12-31
 *         discount:
 *           type: number
 *           description: Discount percentage or amount
 *           example: 20
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of coupon creation
 *           example: 2024-12-06T10:20:30Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of coupon update
 *           example: 2024-12-06T10:30:45Z
 */

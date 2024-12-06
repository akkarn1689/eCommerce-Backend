import express from "express";
import * as brand from "./brand.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addBrandValidation,
  deleteBrandValidation,
  updateBrandValidation,
} from "./brand.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(addBrandValidation),
    brand.addBrand
  )
  .get(brand.getAllBrands);

brandRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateBrandValidation),
    brand.updateBrand
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteBrandValidation),
    brand.deleteBrand
  );

export default brandRouter;


/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Manage product brands
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the brand
 *         slug:
 *           type: string
 *           description: Slugified name of the brand
 *       example:
 *         name: Nike
 *         slug: nike
 *
 *     UpdateBrand:
 *       type: object
 *       required:
 *         - name
 *         - id
 *       properties:
 *         name:
 *           type: string
 *           description: Updated name of the brand
 *         id:
 *           type: string
 *           description: Brand ID
 *       example:
 *         name: Adidas
 *         id: 60d21b4667d0d8992e610c85
 *
 *     DeleteBrand:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Brand ID
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *
 *     BrandsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Status message
 *         page:
 *           type: integer
 *           description: Current page number
 *         getAllBrands:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Brand'
 *       example:
 *         message: success
 *         page: 1
 *         getAllBrands:
 *           - name: Nike
 *             slug: nike
 *           - name: Adidas
 *             slug: adidas
 */

/**
 * @swagger
 * /api/v1/brands:
 *   post:
 *     summary: Add a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized, missing or invalid token
 *
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       201:
 *         description: List of brands retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandsResponse'
 */

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   put:
 *     summary: Update an existing brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBrand'
 *     responses:
 *       201:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Brand not found
 *
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBrand'
 *     responses:
 *       204:
 *         description: Brand deleted successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Brand not found
 */

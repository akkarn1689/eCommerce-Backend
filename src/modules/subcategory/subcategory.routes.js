import express from "express";
import * as subCategory from "./subcategory.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addSubCategoryValidation,
  deleteSubCategoryValidation,
  updateSubCategoryValidation,
} from "./subcategory.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(addSubCategoryValidation),
    subCategory.addSubCategory
  )
  .get(subCategory.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(updateSubCategoryValidation),
    subCategory.updateSubCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(deleteSubCategoryValidation),
    subCategory.deleteSubCategory
  );

export default subCategoryRouter;



/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: Operations related to SubCategories
 */

/**
 * @swagger
 * /api/v1/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     description: Creates a new subcategory under a specified category.
 *     tags: [SubCategories]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 addSubcategory:
 *                   $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /api/v1/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     description: Retrieve all subcategories. Optionally, filter by category.
 *     tags: [SubCategories]
 *     parameters:
 *       - name: category
 *         in: query
 *         description: The category to filter subcategories by (optional).
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination (optional).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page (optional).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 getAllSubCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid query parameters
 */

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   put:
 *     summary: Update a subcategory
 *     description: Updates the details of an existing subcategory.
 *     tags: [SubCategories]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the subcategory to update
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b3f8f1b2c001c4c82b3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 updateSubCategory:
 *                   $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Subcategory not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory
 *     description: Deletes a specific subcategory by its ID.
 *     tags: [SubCategories]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the subcategory to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b3f8f1b2c001c4c82b3
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Subcategory not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the subcategory.
 *           example: "Smartphones"
 *         category:
 *           type: string
 *           description: The ID of the parent category.
 *           example: "60c72b3f8f1b2c001c4c82b3"
 *         slug:
 *           type: string
 *           description: A URL-friendly version of the subcategory name.
 *           example: "smartphones"
 *       required:
 *         - name
 *         - category
 */


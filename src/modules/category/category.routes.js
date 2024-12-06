import express from "express";
import * as category from "./category.controller.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import {
  addCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";
import { validate } from "../../middlewares/validate.js";
import { uploadSingleFile } from "../../../multer/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategories", subCategoryRouter);

categoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("Image", "category"),
    validate(addCategoryValidation),
    category.addCategory
  )
  .get(category.getAllCategories);

categoryRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateCategoryValidation),
    category.updateCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteCategoryValidation),
    category.deleteCategory
  );

export default categoryRouter;


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing product categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - Image
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *         slug:
 *           type: string
 *           description: Slugified name of the category
 *         Image:
 *           type: string
 *           format: binary
 *           description: Image file for the category
 *       example:
 *         name: Electronics
 *         slug: electronics
 *         Image: category-image.jpg
 *
 *     UpdateCategory:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Category ID
 *         name:
 *           type: string
 *           description: Updated name of the category
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         name: Gadgets
 *
 *     DeleteCategory:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Category ID to delete
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 */

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               Image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the category
 *     responses:
 *       201:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 getAllCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       201:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */

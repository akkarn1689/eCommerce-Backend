import express from "express";
import * as product from "./product.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  addProductValidation,
  deleteProductValidation,
  getSpecificProductValidation,
  updateProductValidation,
} from "./product.validation.js";
import { uploadMultipleFiles } from "../../../multer/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = express.Router();

let arrFields = [
  { name: "imgCover", maxCount: 1 },
  { name: "images", maxCount: 20 },
];

productRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    uploadMultipleFiles(arrFields, "products"),
    validate(addProductValidation),
    product.addProduct
  )
  .get(product.getAllProducts);

productRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateProductValidation),
    product.updateProduct
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteProductValidation),
    product.deleteProduct
  )
  .get(validate(getSpecificProductValidation), product.getSpecificProduct);

export default productRouter;


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imgCover:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               priceAfterDiscount:
 *                 type: number
 *               quantity:
 *                 type: number
 *               sold:
 *                 type: number
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               brand:
 *                 type: string
 *               ratingAvg:
 *                 type: number
 *               ratingCount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 addProduct:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
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
 *         description: Limit of items per page
 *     responses:
 *       200:
 *         description: Successfully fetched all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 getAllProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully fetched the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 getSpecificProduct:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imgCover:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               priceAfterDiscount:
 *                 type: number
 *               quantity:
 *                 type: number
 *               sold:
 *                 type: number
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               brand:
 *                 type: string
 *               ratingAvg:
 *                 type: number
 *               ratingCount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully updated the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updateProduct:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         imgCover:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         priceAfterDiscount:
 *           type: number
 *         quantity:
 *           type: number
 *         sold:
 *           type: number
 *         category:
 *           type: string
 *         subcategory:
 *           type: string
 *         brand:
 *           type: string
 *         ratingAvg:
 *           type: number
 *         ratingCount:
 *           type: number
 *         slug:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

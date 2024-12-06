import express from "express";
import * as User from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  addUserValidation,
  changeUserPasswordValidation,
  deleteUserValidation,
  updateUserValidation,
} from "./user.validation.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validate(addUserValidation), User.addUser)
  .get(User.getAllUsers);

userRouter
  .route("/:id")
  .put(validate(updateUserValidation), User.updateUser)
  .delete(validate(deleteUserValidation), User.deleteUser)
  .patch(validate(changeUserPasswordValidation), User.changeUserPassword);

export default userRouter;


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 addUser:
 *                   type: object
 *       400:
 *         description: Bad request. Validation failed.
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: List of all users with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 getAllUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid request.
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User's unique identifier.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updateUser:
 *                   type: object
 *       404:
 *         description: User not found.
 *       400:
 *         description: Invalid request. Validation failed.
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User's unique identifier.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /api/v1/users/{id}/change-password:
 *   patch:
 *     summary: Change user's password
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User's unique identifier.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password successfully changed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 changeUserPassword:
 *                   type: object
 *       404:
 *         description: User not found.
 *       400:
 *         description: Invalid request. Validation failed.
 */

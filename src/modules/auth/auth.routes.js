import express from "express";
import * as auth from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", auth.signUp);
authRouter.post("/signin", auth.signIn);

export default authRouter;


/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: "P@ssw0rd!"
 *
 *     SignInRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       example:
 *         email: johndoe@example.com
 *         password: "P@ssw0rd!"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *           description: JWT token
 *       example:
 *         message: success
 *         token: eyJhbGciOiJIUzI1NiIsIn...
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       409:
 *         description: Account already exists
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Login an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       201:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/v1/auth/protected:
 *   get:
 *     summary: Access a protected route
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Successfully accessed protected route
 *       401:
 *         description: Token was not provided or is invalid
 */

/**
 * @swagger
 * /api/v1/auth/role-based:
 *   get:
 *     summary: Access a role-based route
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Access granted based on role
 *       401:
 *         description: User role not authorized
 */

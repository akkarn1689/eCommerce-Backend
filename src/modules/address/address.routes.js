import express from "express";
import { validate } from "../../middlewares/validate.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as address from "../address/address.controller.js";
import {
  addAddressValidation,
  deleteAddressValidation,
} from "./address.validation.js";

const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch(
    protectedRoutes,
    allowedTo("user"),
    validate(addAddressValidation),
    address.addAddress
  )
  .delete(
    protectedRoutes,
    allowedTo("user"),
    validate(deleteAddressValidation),
    address.removeAddress
  )
  .get(protectedRoutes, allowedTo("user"), address.getAllAddresses);

export default addressRouter;


/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Manage user addresses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - city
 *         - street
 *         - phone
 *       properties:
 *         city:
 *           type: string
 *           description: City name
 *         street:
 *           type: string
 *           description: Street address
 *         phone:
 *           type: string
 *           description: Phone number associated with the address
 *       example:
 *         city: New York
 *         street: 123 5th Ave
 *         phone: 123-456-7890
 *
 *     DeleteAddressRequest:
 *       type: object
 *       required:
 *         - address
 *       properties:
 *         address:
 *           type: string
 *           description: Address ID to delete
 *       example:
 *         address: 60d21b4667d0d8992e610c85
 *
 *     AddressesResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Status message
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *       example:
 *         message: success
 *         addresses:
 *           - city: New York
 *             street: 123 5th Ave
 *             phone: 123-456-7890
 *           - city: Los Angeles
 *             street: 456 Sunset Blvd
 *             phone: 987-654-3210
 */

/**
 * @swagger
 * /api/v1/address:
 *   patch:
 *     summary: Add a new address to the user's profile
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressesResponse'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized, missing or invalid token
 *
 *   delete:
 *     summary: Remove an address by ID
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteAddressRequest'
 *     responses:
 *       201:
 *         description: Address removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressesResponse'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Address not found
 *
 *   get:
 *     summary: Get all addresses for the user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: List of addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressesResponse'
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: User or addresses not found
 */

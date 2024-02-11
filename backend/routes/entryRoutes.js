const express = require("express");

const router = express.Router();

const {
  allEntryHandler,
  entryDetailsHandler,
  newEntryHandler,
  updateEntryHandler,
  deleteEntryHandler,
} = require("../controllers/entryController");

/**
 * @swagger
 * /entries/:
 *   get:
 *     summary: Gets all entries for user
 *     description: Gets all entries for user
 *     tags: [entries]
 *     responses:
 *      '200':
 *        description: Entry Details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                entries:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 1
 *                      user_id:
 *                        type: number
 *                        example: 1
 *                      title:
 *                        type: string
 *                        example: Entry 1
 *                      gratitude:
 *                        type: string
 *                        example: I'm thankful for my kitties.
 *                      entry:
 *                        type: string
 *                        example: Today was a good day. Just gonna send it.
 *      '403':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: "Error: Unauthorized"
 *
 */
router.get("/", allEntryHandler);

/**
 * @swagger
 * /entries/:
 *   post:
 *     summary: Creates new entry
 *     description: Creates entry in database and returns basic info.
 *     tags: [entries]
 *     responses:
 *      '201':
 *        description: Entry created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: Entry registered successfully
 *                entry:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 1
 *                    user_id:
 *                      type: number
 *                      example: 1
 *                    title:
 *                      type: string
 *                      example: Entry 1
 *                    gratitude:
 *                      type: string
 *                      example: I'm thankful for my kitties.
 *                    entry:
 *                      type: string
 *                      example: Today was a good day. Just gonna send it.
 *      '400':
 *          description: Missing fields
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    description: Message indicating fields missing
 *                    example: "Error: Missing Fields"
 *      '403':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: "Error: Unauthorized"

 */
router.post("/", newEntryHandler);

/**
 * @swagger
 * /entries/{id}:
 *   get:
 *     summary: Entry Details
 *     description: Get entry details
 *     tags: [entries]
 *     responses:
 *      '200':
 *        description: Entry Details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "Entry Details"
 *                entry:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 1
 *                      user_id:
 *                        type: number
 *                        example: 1
 *                      title:
 *                        type: string
 *                        example: Entry 1
 *                      gratitude:
 *                        type: string
 *                        example: I'm thankful for my kitties.
 *                      entry:
 *                        type: string
 *                        example: Today was a good day. Just gonna send it.
 *      '400':
 *          description: No entry id
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    description: Message indicating fields missing
 *                    example: "Error: Missing Entry ID"
 *      '403':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: "Error: Unauthorized"
 *      '404':
 *        description: No entry found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Message indicating no entry found
 *                  example: "Error: No entry found"
 *
 *
 */
router.get("/:id", entryDetailsHandler);

/**
 * @swagger
 * /entries/{id}:
 *   patch:
 *     summary: Update Entry
 *     description: Update entry details
 *     tags: [entries]
 *     responses:
 *      '200':
 *        description: Successfully deleted entry
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "Entry updated successfully"
 *      '400':
 *          description: "Error: Missing fields"
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    description: Message indicating fields missing
 *                    example: "Error: Missing Fields"
 *      '403':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: "Error: Unauthorized"
 *      '404':
 *        description: No entry found to update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Message indicating no entry found
 *                  example: "Error: No entry found"
 */
router.patch("/:id", updateEntryHandler);

/**
 * @swagger
 * /entries/{id}:
 *   delete:
 *     summary: Delete Entry
 *     description: Deletes entry
 *     tags: [entries]
 *     responses:
 *      '200':
 *        description: Successfully deleted entry
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "Entry deleted successfully"
 *      '403':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: "Error: Unauthorized"
 *      '404':
 *        description: No entry found to delete
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Message indicating no entry found
 *                  example: "Error: No entry found"

 */
router.delete("/:id", deleteEntryHandler);

module.exports = router;

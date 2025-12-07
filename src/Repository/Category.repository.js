const { pool } = require("../DB/connection");

/**
 * Repository responsible for all database operations related to Categories.
 * 
 * Categories are used to classify content such as Articles or Books.
 * This repository provides CRUD operations while abstracting SQL logic
 * away from higher layers in the architecture.
 */
class CategoryRepository {

    /**
     * Creates a new category in the database.
     *
     * @param {Object} params - Category data.
     * @param {string} params.categoryName - The name of the category.
     * 
     * @returns {Promise<Object>} The newly created category.
     * @throws {Error} If the creation fails.
     */
    async createCategory({ categoryName }) {
        const [result] = await pool.query(
            `INSERT INTO Category (name) VALUES (?)`,
            [categoryName]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to create category");
        }

        return this.findById(result.insertId);
    }

    /**
     * Retrieves all categories from the database.
     *
     * @returns {Promise<Object[]|null>} Array of categories or null if none exist.
     */
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM Category`);
        return rows.length ? rows : null;
    }

    /**
     * Retrieves a category by its ID.
     *
     * @param {number} id - The category's ID.
     * @returns {Promise<Object|null>} The category or null if not found.
     * @throws {Error} If ID is invalid.
     */
    async findById(id) {
        if (!id) throw new Error("Invalid ID");

        const [rows] = await pool.query(
            `SELECT * FROM Category WHERE id = ?`,
            [id]
        );

        return rows.length ? rows[0] : null;
    }

    /**
     * Deletes a category by its ID.
     *
     * @param {number} id - The category's ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     * @throws {Error} If the category does not exist or deletion fails.
     */
    async deleteById(id) {
        const category = await this.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }

        const [result] = await pool.query(
            `DELETE FROM Category WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to delete category");
        }

        return true;
    }

    /**
     * Updates a category's name.
     *
     * @param {number} id - The category's ID.
     * @param {Object} params - Updated data.
     * @param {string} params.categoryName - New name for the category.
     * 
     * @returns {Promise<Object>} The updated category record.
     * @throws {Error} If the category does not exist or update fails.
     */
    async updateById(id, { categoryName }) {
        const category = await this.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }

        const [result] = await pool.query(
            `UPDATE Category SET name = ? WHERE id = ?`,
            [categoryName, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to update category");
        }

        return this.findById(id);
    }
}

module.exports = CategoryRepository;

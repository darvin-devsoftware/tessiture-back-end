/**
 * Service layer responsible for business logic related to Categories.
 *
 * Although Categories have minimal logic compared to other modules,
 * keeping a dedicated service layer preserves architectural consistency
 * and makes it easy to extend behavior later (e.g., validation, caching,
 * logging, access control).
 */
class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Creates a new category.
     *
     * @param {Object} categoryData - Data required to create a category.
     * @param {string} categoryData.categoryName - The name of the category.
     *
     * @returns {Promise<Object>} The created category record.
     */
    async createCategory(categoryData) {
        return this.categoryRepository.createCategory(categoryData);
    }

    /**
     * Retrieves all categories.
     *
     * @returns {Promise<Object[]|null>} Array of categories or null if none exist.
     */
    async findAll() {
        return this.categoryRepository.findAll();
    }

    /**
     * Retrieves a specific category by its ID.
     *
     * @param {number} categoryId - The category's ID.
     * @returns {Promise<Object|null>} The category record or null if not found.
     */
    async findById(categoryId) {
        return this.categoryRepository.findById(categoryId);
    }

    /**
     * Updates an existing category.
     *
     * @param {number} categoryId - Category ID.
     * @param {Object} updateData - Fields to update.
     * @param {string} updateData.categoryName - Updated name.
     *
     * @returns {Promise<Object>} The updated category.
     */
    async updateById(categoryId, updateData) {
        return this.categoryRepository.updateById(categoryId, updateData);
    }

    /**
     * Deletes a category by its ID.
     *
     * @param {number} categoryId - Category ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async deleteById(categoryId) {
        return this.categoryRepository.deleteById(categoryId);
    }
}

module.exports = CategoryService;

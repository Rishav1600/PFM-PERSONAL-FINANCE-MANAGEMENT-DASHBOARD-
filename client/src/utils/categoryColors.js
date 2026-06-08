/**
 * Standardized color mapping for financial categories
 * to be used in charts and UI elements.
 */
export const categoryColors = {
    Housing: '#4F46E5',        // Indigo 600
    Food: '#10B981',           // Emerald 500
    'Food & Dining': '#10B981', 
    Transportation: '#F59E0B',  // Amber 500
    Transport: '#F59E0B',
    Entertainment: '#EF4444',   // Red 500
    Utilities: '#06B6D4',       // Cyan 500
    Health: '#EC4899',          // Pink 500
    Shopping: '#8B5CF6',        // Violet 500
    Salary: '#10B981',          // Emerald 500 (Income)
    Other: '#94A3B8',           // Slate 400
};

/**
 * Gets a color for a specific category or returns a default
 * @param {string} category 
 * @returns {string} Hex color code
 */
export const getCategoryColor = (category) => {
    return categoryColors[category] || categoryColors.Other;
};

export default categoryColors;

/**
 * Categorize a transaction based on its description
 * @param {string} description 
 * @returns {string} category
 */
const categorizeTransaction = (description) => {
    const desc = description.toLowerCase();

    const categories = {
        Food: ['restaurant', 'cafe', 'mcdonalds', 'starbucks', 'food', 'grocery', 'supermarket', 'walmart', 'kroger'],
        Transport: ['uber', 'lyft', 'taxi', 'gas', 'shell', 'chevron', 'subway', 'train', 'bus'],
        Entertainment: ['netflix', 'spotify', 'hulu', 'disney', 'cinema', 'movie', 'game', 'steam'],
        Shopping: ['amazon', 'ebay', 'target', 'clothing', 'mall', 'shop'],
        Health: ['pharmacy', 'cvs', 'walgreens', 'doctor', 'hospital', 'gym', 'fitness'],
        Utilities: ['electric', 'water', 'internet', 'comcast', 'verizon', 'att', 'phone', 'bill'],
        Salary: ['salary', 'paycheck', 'deposit', 'income'],
    };

    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => desc.includes(keyword))) {
            return category;
        }
    }

    return 'Other'; // Default category
};

module.exports = categorizeTransaction;

/**
 * Fetches beauty advice using the injected AI service based on product info, reviews, and guest preferences.
 * @param {object} aiService - An AI service with a `getCompletion` method.
 * @param {string} productInfo - Details about the product.
 * @param {Array} productReviews - Guest reviews of the product.
 * @param {string} guestPreferences - Guest preferences for a beauty product.
 * @returns {Promise<string>} - AI-generated beauty advice.
 */
const getBeautyAdvice = async (aiService, productInfo, productReviews, guestPreferences) => {
    const prompt = `
      You are a beauty advisor. A customer is looking for a skincare product that suits their preferences.
      Customer Preferences: ${guestPreferences}
  
      Here is the product information:
      ${productInfo}
  
      Here are some customer reviews for this product:
      ${productReviews.join('\n')}
  
      Please provide a recommendation based on the customer's needs, highlighting the relevant product information and any warnings or advice from the reviews.
    `;
  
    const advice = await aiService.getCompletion(prompt);
    return advice;
  };
  
  module.exports = { getBeautyAdvice };

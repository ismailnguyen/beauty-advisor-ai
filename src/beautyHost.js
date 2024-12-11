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
  
    return await aiService.getCompletion(prompt);
  };

  const suggestGifts = async (aiService, productsCatalogUrl) => {
    const prompt = `
      You are a virtual business host for Maison L'Occitane en Provence, a renowned cosmetics and skincare brand inspired by the beauty of Provence.
      
      Your role is to help customers find the perfect gift using the products available on the provided URL: ${productsCatalogUrl}.
      
      Task: Explore the URL: Review the products listed on the provided URL and select three recommendations based on their suitability as thoughtful gifts.
      
      Highlight Key Features: Provide relevant product details such as the title, price, format (in ml; select one value if multiple are available), and an image link. Explain the product values, such as the use of natural ingredients, ethical commitments, and Provençal inspiration.
      
      Engage with Storytelling: Use engaging and concise storytelling to explain why each product would make a perfect gift.
      
      Connect the product's features to moments of joy, relaxation, or luxury to evoke the essence of Provence.
      
      
      Output Format: Deliver your response in JSON format based on https://au.loccitane.com with the following structure: sku": 1,       "title": "add here the product name ",       "format": add here the format size,       "price": add here the price,       "image": add here the image URL , here is an example of the expected format https://au.loccitane.com/dw/image/v2/BDTW_PRD/on/demandware.static/-/Sites-occ_master/default/dw23a2373b/"ReplaceBySKU".png?sw=1200&sh=1200       "story_telling": "add here the story telling behind the gift."     }
      
      Please give me a valid image link to the product, check if it works correctly.

      Additional Notes: Ensure that your storytelling aligns with the brand’s luxurious and warm image. Prioritize products that are versatile and have broad appeal for various occasions.
    `;

    return await aiService.getCompletion(prompt);
  }
  
  module.exports = {
    getBeautyAdvice,
    suggestGifts
  };

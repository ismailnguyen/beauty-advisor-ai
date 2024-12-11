const BeautyHost = require('./src/beautyHost');
const OpenAiService = require('./src/aiServices/openAiService');

require("dotenv").config();

(async () => {
  const openAiService = new OpenAiService(process.env.OPENAI_API_KEY);
  const productInfo = "Ultra Glow Serum by Radiance Skincare with Vitamin C and Hyaluronic Acid.";
  const productReviews = [
    "Amazing product! My skin looks so radiant after using this for two weeks.",
    "Not great for sensitive skin. I had some irritation after use."
  ];
  const guestPreferences = "I want a serum that brightens skin and reduces wrinkles, but I have sensitive skin.";

  const advice = await BeautyHost.getBeautyAdvice(openAiService, productInfo, productReviews, guestPreferences);
  console.log("Beauty Host Recommendation:");
  console.log(advice);
})();
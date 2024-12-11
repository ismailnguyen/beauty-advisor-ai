const BeautyHost = require('./src/beautyHost');
const OpenAiService = require('./src/aiServices/openAiService');

require("dotenv").config();

(async () => {
  // get user input for product info and a list of reviews and guest preferences, if nothing given take the following as default
  const productInfo = process.argv[2] || "Ultra Glow Serum by Radiance Skincare with Vitamin C and Hyaluronic Acid.";

  const productReviews = process.argv[3] || [
    "Amazing product! My skin looks so radiant after using this for two weeks.",
    "Not great for sensitive skin. I had some irritation after use."
  ];

  const guestPreferences = process.argv[4] ||  "I want a serum that brightens skin and reduces wrinkles, but I have sensitive skin.";

  const advice = await BeautyHost.getBeautyAdvice(
    new OpenAiService(process.env.OPENAI_API_KEY),
    productInfo,
    productReviews,
    guestPreferences
  );

  console.log("Beauty Host Recommendation:");
  console.log(advice);
})();
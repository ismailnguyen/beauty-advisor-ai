const {
  getBeautyAdvice,
  suggestGifts
} = require('../src/beautyHost');

// Mock AI service
class MockAiService {
  async getCompletion(prompt) {
    return "The Ultra Glow Serum is a good option for brightening skin and reducing wrinkles. However, it may cause irritation for sensitive skin.";
  }
}

describe('getBeautyAdvice', () => {
  it('should provide a beauty host recommendation based on product and reviews', async () => {
    const mockAiService = new MockAiService();
    const productInfo = "Ultra Glow Serum by Radiance Skincare with Vitamin C and Hyaluronic Acid.";
    const productReviews = [
      "Amazing product! My skin looks so radiant after using this for two weeks.",
      "Not great for sensitive skin. I had some irritation after use."
    ];
    const guestPreferences = "I want a serum that brightens skin and reduces wrinkles, but I have sensitive skin.";

    const advice = await getBeautyAdvice(mockAiService, productInfo, productReviews, guestPreferences);

    expect(advice).toContain("Ultra Glow Serum");
    expect(advice).toContain("brightening skin");
    expect(advice).toContain("may cause irritation for sensitive skin");
  });
});

describe('suggestGifts', () => {
  it('should provide a beauty host recommendation based on a product catalog URL', async () => {
    const mockAiService = new MockAiService();
    const productsCatalogUrl = "https://au.loccitane.com";

    const advice = await suggestGifts(mockAiService, productsCatalogUrl);

    expect(advice).toContain("Ultra Glow Serum");
    expect(advice).toContain("brightening skin");
    expect(advice).toContain("may cause irritation for sensitive skin");
  });
});

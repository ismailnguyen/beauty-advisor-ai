const { handler } = require("../netlify/functions/api");
const OpenAiService = require("../src/aiServices/openAiService");
const BeautyHost = require('../src/beautyHost');

jest.mock("../src/aiServices/openAiService");
jest.mock("../src/beautyHost");

describe("Netlify API Handler", () => {
  let mockGetBeautyAdvice;

  beforeAll(() => {
    mockGetBeautyAdvice = jest.fn();
    BeautyHost.getBeautyAdvice = mockGetBeautyAdvice;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return AI advice with status 200", async () => {
    // Mock input data
    const mockEvent = {
      body: JSON.stringify({
        openai_api_key: "mock-api-key",
        product_info: "Mock Product Info",
        product_reviews: ["Review 1", "Review 2"],
        guest_preferences: "Mock Guest Preferences",
      }),
    };

    // Mock AI advice
    const mockAdvice = "This is mock AI advice based on the input.";
    mockGetBeautyAdvice.mockResolvedValue(mockAdvice);

    // Mock OpenAiService constructor
    OpenAiService.mockImplementation(() => ({
      getCompletion: jest.fn(),
    }));

    // Call the handler
    const result = await handler(mockEvent, {});

    // Assertions
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(mockAdvice);
    expect(OpenAiService).toHaveBeenCalledWith("mock-api-key");
    expect(mockGetBeautyAdvice).toHaveBeenCalledWith(
      expect.any(Object), // The OpenAiService instance
      "Mock Product Info",
      ["Review 1", "Review 2"],
      "Mock Guest Preferences"
    );
  });
});
const OpenAiService = require('../../src/aiServices/openAiService');

// Mock the OpenAI library
jest.mock('openai', () => {
  const createCompletion = jest.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: "This is a mock AI response.",
        },
      },
    ],
  });

  const OpenAI = jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: createCompletion,
      },
    },
  }));

  return OpenAI;
});

const OpenAI = require("openai");

describe("OpenAiService", () => {
  let openAiService;
  let openAIClient = new OpenAI();

  beforeAll(() => {
    // Create an instance of OpenAiService
    openAiService = new OpenAiService("mock_api_key");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a response when getCompletion is called", async () => {
    const prompt = "Mock prompt for testing";

    const response = await openAiService.getCompletion(prompt);

    expect(response).toBe("This is a mock AI response.");
  });

  it("should call OpenAI API with the correct parameters", async () => {
    const prompt = "Another mock prompt for testing";

    // Call the function
    await openAiService.getCompletion(prompt);

    // Verify the API was called with correct arguments
    expect(openAIClient.chat.completions.create).toHaveBeenCalledWith({
      messages: [
        { role: "system", content: "You are an expert beauty advisor." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o",
    });
  });
});
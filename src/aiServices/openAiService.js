const OpenAI = require('openai');

class OpenAiService {
  constructor(apiKey) {
    this.client = new OpenAI({
      apiKey: apiKey
    });
  }

  async getCompletion(prompt) {
    const completion = await this.client.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert beauty advisor." },
        { role: "user", content: prompt },
      ],
      model: 'gpt-4o',
    });

    return completion.choices[0].message.content;
  }
}

module.exports = OpenAiService;
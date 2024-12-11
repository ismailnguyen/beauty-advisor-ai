const BeautyHost = require('../../src/beautyHost')
const OpenAiService = require('../../src/aiServices/openAiService');

/* The `exports.handler` function is the entry point for the Netlify function. When the 
function is triggered, this function will be executed. */
exports.handler = async function (event, context) {
    // Parse the body of the event to retrieve the parameters that were passed to the function.
    const {
        openai_api_key,
        product_catalog_url,
    } = JSON.parse(event.body);

    const openAiService = new OpenAiService(openai_api_key);

    const advice = await BeautyHost.suggestGifts(openAiService, product_catalog_url);

    // Return the results of the ai advice
    return {
        statusCode: 200,
        body: advice,
    };
};
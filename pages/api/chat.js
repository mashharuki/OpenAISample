import { Configuration, OpenAIApi } from "openai";

// config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
// create OpenAIApi object
const openai = new OpenAIApi(configuration);

/**
 * main function
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }
    
    const prompt = req.body.prompt || '';
    if (prompt.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter something",
            }
        });
        return;
    }

    try {
        // call createCompletion function
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        });
        // return result
        res.status(200).json({ result: completion.data.choices[0].text });
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
};
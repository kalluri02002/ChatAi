import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OpenAPI_key,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())



app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
 
    console.log(response.data.choices[0].text) 
    res.status(200).send({
      bot: response.data.choices[0].text
    });
 

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5001, () => console.log('AI server started on http://localhost:5001'))
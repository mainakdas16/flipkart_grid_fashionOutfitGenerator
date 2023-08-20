const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./models/schema")
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

const api_key = "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";

mongoose.connect("mongodb+srv://dmainak706:26INPAFmou11YO0y@cluster0.a6gqysn.mongodb.net/")

// promt to be given via req.body
app.post("/completions", async (req, res) => {
    try {
        
        const response = await fetch("https://api.openai.com/v1/completions", {
            method:"POST",

            headers : {
                "Authorization" : `Bearer ${api_key}`,
                "Content-type" : "application/json"
            },

            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: req.body.promt,
                max_tokens: 100,
                temperature: 0.9,
            })
        })

        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.error(error);
    }
})

app.post("/images", async (req, res) => {

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method:"POST",

            headers : {
                "Authorization" : `Bearer ${api_key}`,
                "Content-type" : "application/json"
            },

            body: JSON.stringify({
                prompt: req.body.prompt,
                n: 4,
                size: "256x256",
            })
        })

        const resp = await response.json();
        console.log(resp);
        res.send(resp.data);
    } catch (error) {
        console.error(error);
    }
})

// adding the prompt to the database
app.post("/newPrompt", async (req, res) => {
    try {
        const prompt = req.body.newPrompt

        const doc = await db.create({
            prompt
        })

        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
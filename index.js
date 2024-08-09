const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Webhook endpoint to handle requests from Dialogflow
app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    // Handle the GetPDF intent
    if (intentName === 'GetPDF') {
        // Example: Define the URL of the PDF
        const pdfUrl = 'https://dev-inventiveblogs.pantheonsite.io/wp-content/uploads/2024/08/Computer-Science-1st-Year-01-10-All-Chapters_compressed-1-1.pdf';

        // Prepare the response
        const response = {
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            `Here is the PDF you requested: [Download PDF](${pdfUrl})`
                        ]
                    }
                }
            ]
        };
        // Send the response back to Dialogflow
        res.json(response);
    } else {
        // Default response for unhandled intents
        res.json({ fulfillmentText: "Sorry, I don't understand that request." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Webhook server running on port ${port}`);
});

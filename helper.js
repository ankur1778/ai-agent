const axios = require("axios");
const cheerio = require("cheerio");

async function getDataFromWeb(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching webpage:", error);
    throw new Error("Failed to fetch webpage content.");
  }
}

async function extractAnswerFromWebpage(html, query) {
  const $ = cheerio.load(html);
  const webpageText = $("body").text();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Answer the following question based on the text below:\n\nQuestion: ${query}\n\nText: ${webpageText}`;

    const response = await model.generateContent(prompt);
    return response.response.text().trim();
  } catch (error) {
    console.error("Error extracting answer:", error);
    throw new Error("Failed to extract answer from content.");
  }
}

module.exports = { getDataFromWeb, extractAnswerFromWebpage };

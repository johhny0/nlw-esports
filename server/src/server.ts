import express from "express";

const app = express();

app.get("/", (request, response) => response.json({ status: "Connected" }));

app.listen(3333, () => console.log("Connected! 🔥"));
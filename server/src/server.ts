import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const app = express();
const prisma = new PrismaClient({
    log: ["error"]
});

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => response.json({ status: "Connected" }));

app.get("/ads", async (request, response) => {
    const ads = await prisma.ad.findMany();
    return response.json(ads);
})

app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.json(games);
})
app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }));
})

app.get("/ads/:id/discord", async (request, response) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: { discord: true },
        where: { id: adId }
    })


    response.json({
        discord: ad.discord
    });
})

app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id
    const body = request.body

    console.log(body);
    // #TODO: ZOD JAVASCRIPT - Framework for validation
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })


    response.status(201).json(ad);
})

app.listen(3333, () => console.log("Connected! 🔥"));
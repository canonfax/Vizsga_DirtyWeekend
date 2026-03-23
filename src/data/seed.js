"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEvents = void 0;
const EventCategory_1 = require("../types/EventCategory");
exports.seedEvents = [
    {
        id: "speedway-weekend",
        name: "Speedway Weekend",
        location: "Gyula Speedway Aréna",
        date: new Date("2026-06-13T10:00:00"),
        category: EventCategory_1.EventCategory.SPEEDWAY,
        description: "Salakmotoros, quados és egyéb extrém motorsport kategóriák egész hétvégén.",
        participants: []
    },
    {
        id: "quad-championship",
        name: "Quad Masters Show",
        location: "Kiskunlacháza Offroad Center",
        date: new Date("2026-07-04T09:30:00"),
        category: EventCategory_1.EventCategory.QUAD,
        description: "Profik és amatőrök quados kihívásai."
    },
    {
        id: "csaladi-piknik",
        name: "Motoros Családi Piknik",
        location: "Margitsziget",
        date: new Date("2026-05-01T12:00:00"),
        category: EventCategory_1.EventCategory.OTHER
    }
];

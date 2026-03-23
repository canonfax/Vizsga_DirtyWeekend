"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventRepository_1 = require("./services/EventRepository");
const EventService_1 = require("./services/EventService");
const seed_1 = require("./data/seed");
const EventCategory_1 = require("./types/EventCategory");
async function main() {
    const repo = new EventRepository_1.EventRepository();
    const service = new EventService_1.EventService(repo);
    for (const seed of seed_1.seedEvents) {
        const result = await service.createAsync(seed);
        if (!result.ok) {
            console.error(`Nem sikerült léterhozni: ${seed.name}`, result.error.message);
        }
    }
    const pista = {
        id: "pista-speedway",
        fullName: "Széles Pista",
        email: "pista@speedway.hu",
        notes: "Salakmotoros induló"
    };
    const kata = {
        id: "quad-kata",
        fullName: "Barath Katalin",
        email: "kata@quad.hu",
        notes: "Quad pro kategória"
    };
    service.addParticipant("speedway-weekend", pista);
    service.addParticipant("quad-championship", kata);
    console.table(service.listAll().map((event) => ({
        id: event.id,
        name: event.name,
        category: event.category,
        participants: event.listParticipants().length
    })));
    console.log("Tematikus csoportosítás:");
    const grouped = service.groupByCategory();
    Object.keys(grouped).forEach((key) => {
        console.log(`- ${key}: ${grouped[key].length} rendezvény`);
    });
    console.log("Speedway rendezvények:");
    console.log(service.listByCategory(EventCategory_1.EventCategory.SPEEDWAY).map((event) => event.name));
}
main().catch((error) => {
    console.error("Váratlan hiba:", error);
    process.exit(1);
});

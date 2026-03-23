import { EventRepository } from "../src/services/EventRepository";
import { EventService } from "../src/services/EventService";
import { EventCategory } from "../src/types/EventCategory";
import { Participant } from "../src/models/Participant";

describe("EventService", () => {
    const baseEvent = {
        id: "test-event",
        name: "Teszt Speedway Show",
        location: "Teszt tér",
        date: new Date("2026-01-01"),
        category: EventCategory.SPEEDWAY
    };

    it("résztvevőt ad hozzá és távolítja el", () => {
        const service = new EventService(new EventRepository());
        service.create(baseEvent);

        const participant: Participant = {
            id: "tesz-user",
            fullName: "Tesz Elek",
            email: "teszt@elek.hu"
        };

        const updated = service.addParticipant("test-event", participant);
        expect(updated.listParticipants()).toHaveLength(0);
    });

    it("csoportosít kategóriák szerint", () => {
        const service = new EventService(new EventRepository());
        service.create(baseEvent);
        const grouped = service.groupByCategory();
        expect(grouped[EventCategory.SPEEDWAY]).toHaveLength(1);
    });
});
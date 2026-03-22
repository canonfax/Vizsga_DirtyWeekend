import { Event, EventProps } from "../models/Event";
import { Participant } from "../models/Participant";
import { EventRepository } from "./EventRepository";
import { LogClass, LogMethod } from "../utils/decorators";
import { Result } from "../types/Result";
import { EventCategory } from "../types/EventCategory";

@LogClass("Service")
export class EventService {
    constructor(private readonly repo: EventRepository) {}

    @LogMethod
    create(eventProps: EventProps): Event {
        const event = new Event(eventProps);
        return this.repo.save(event);
    }

    async createAsync(eventProps: EventProps): Promise<Result<Event>> {
        try {
            const event = this.create(eventProps);
            return { ok: true, data: event };
        } catch (error) {
            return {
                ok: false,
                error:
                    error instanceof Error
                        ?error
                        : new Error("Ismeretlen hiba a létrehozáskor.")
            };
        }
    }

    update(id: string, updates: Partial<EventProps>): Event {
        const existing = this.ensureExists(id);
        if (updates.name) existing.name = updates.name;
        if (updates.location) existing.location = updates.location;
        if (updates.date) existing.date = updates.date;
        if (updates.category) existing.category = updates.category;
        if (updates.description !== undefined) {
            existing.description = updates.description;
        }
        return this.repo.save(existing);
    }

    delete(id: string): void {
        if (!this.repo.delete(id)) {
            throw new Error(`A(z) ${id} azonosítojú rendezvény nem található!`);
        }
    }

    addParticipant(eventId: string, participant: Participant): Event {
        const event = this.ensureExists(eventId);
        event.addParticipant(participant);
        return this.repo.save(event);
    }

    removeParticipant(eventId: string, participantId: string): Event {
        const event = this.ensureExists(eventId);
        event.removeParticipant(participantId);
        return this.repo.save(event);
    }

    listAll(): Event[] {
        return this.repo.findAll();
    }

    listByCategory(category: EventCategory): Event[] {
        return this.repo.findAll().filter((event) => event.category === category);
    }

    groupByCategory(): Record<EventCategory, Event[]> {
        return this.repo.findAll().reduce((acc, event) => {
            acc[event.category] = acc[event.category] ?? [];
            acc[event.category].push(event);
            return acc;
        }, {} as Record<EventCategory, Event[]>);
    }

    private ensureExists(id: string): Event {
        const event = this.repo.findById(id);
        if (!event) {
            throw new Error(`Nincs ilyen rendezvény: ${id}`);
        }
        return event;
    }
}
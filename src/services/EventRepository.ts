import { Event } from "../models/Event";

export class EventRepository {
    private store = new Map<string, Event>();

    save(event: Event): Event {
        this.store.set(event.id, event);
        return event;
    }

    findById(id: string): Event | undefined {
        return this.store.get(id);
    }

    delete(id: string): boolean {
        return this.store.delete(id);
    }

    findAll(): Event[] {
        return Array.from(this.store.values());
    }

    clear(): void {
        this.store.clear();
    }
}
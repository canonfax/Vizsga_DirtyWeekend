"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
class EventRepository {
    constructor() {
        this.store = new Map();
    }
    save(event) {
        this.store.set(event.id, event);
        return event;
    }
    findById(id) {
        return this.store.get(id);
    }
    delete(id) {
        return this.store.delete(id);
    }
    findAll() {
        return Array.from(this.store.values());
    }
    clear() {
        this.store.clear();
    }
}
exports.EventRepository = EventRepository;

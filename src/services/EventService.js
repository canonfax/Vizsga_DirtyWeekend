"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const Event_1 = require("../models/Event");
const decorators_1 = require("../utils/decorators");
let EventService = class EventService {
    constructor(repo) {
        this.repo = repo;
    }
    create(eventProps) {
        const event = new Event_1.Event(eventProps);
        return this.repo.save(event);
    }
    async createAsync(eventProps) {
        try {
            const event = this.create(eventProps);
            return { ok: true, data: event };
        }
        catch (error) {
            return {
                ok: false,
                error: error instanceof Error
                    ? error
                    : new Error("Ismeretlen hiba a létrehozáskor.")
            };
        }
    }
    update(id, updates) {
        const existing = this.ensureExists(id);
        if (updates.name)
            existing.name = updates.name;
        if (updates.location)
            existing.location = updates.location;
        if (updates.date)
            existing.date = updates.date;
        if (updates.category)
            existing.category = updates.category;
        if (updates.description !== undefined) {
            existing.description = updates.description;
        }
        return this.repo.save(existing);
    }
    delete(id) {
        if (!this.repo.delete(id)) {
            throw new Error(`A(z) ${id} azonosítojú rendezvény nem található!`);
        }
    }
    addParticipant(eventId, participant) {
        const event = this.ensureExists(eventId);
        event.addParticipant(participant);
        return this.repo.save(event);
    }
    removeParticipant(eventId, participantId) {
        const event = this.ensureExists(eventId);
        event.removeParticipant(participantId);
        return this.repo.save(event);
    }
    listAll() {
        return this.repo.findAll();
    }
    listByCategory(category) {
        return this.repo.findAll().filter((event) => event.category === category);
    }
    groupByCategory() {
        return this.repo.findAll().reduce((acc, event) => {
            acc[event.category] = acc[event.category] ?? [];
            acc[event.category].push(event);
            return acc;
        }, {});
    }
    ensureExists(id) {
        const event = this.repo.findById(id);
        if (!event) {
            throw new Error(`Nincs ilyen rendezvény: ${id}`);
        }
        return event;
    }
};
exports.EventService = EventService;
__decorate([
    decorators_1.LogMethod
], EventService.prototype, "create", null);
exports.EventService = EventService = __decorate([
    (0, decorators_1.LogClass)("Service")
], EventService);

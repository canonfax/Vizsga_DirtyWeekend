"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(props) {
        this.id = props.id;
        this._name = props.name;
        this._location = props.location;
        this._date = props.date;
        this._category = props.category;
        this._description = props.description;
        this.participants = new Map((props.participants ?? []).map((p) => [p.id, p]));
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (!value.trim()) {
            throw new Error("A rendezvény neve nem lehet üres!");
        }
        this._name = value;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        if (!value.trim()) {
            throw new Error("A rendezvény helyszíne nem lehet üres!");
        }
        this._location = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        if (Number.isNaN(value.getTime())) {
            throw new Error("Érvénytelen dátum.");
        }
        this._date = value;
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    addParticipant(participant) {
        if (this.participants.has(participant.id)) {
            throw new Error(`A résztvevő (${participant.fullName}) már regisztrált!`);
        }
        this.participants.set(participant.id, participant);
    }
    removeParticipant(participantId) {
        if (!this.participants.delete(participantId)) {
            throw new Error(`A résztvevő azonosító (${participantId}) nem található.`);
        }
    }
    listParticipants() {
        return Array.from(this.participants.values());
    }
    toJSON() {
        return {
            id: this.id,
            name: this._name,
            location: this._location,
            date: this._date,
            category: this._category,
            description: this._description,
            participants: this.listParticipants()
        };
    }
}
exports.Event = Event;

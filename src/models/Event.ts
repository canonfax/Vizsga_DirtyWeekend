import { Participant } from "./Participant";
import { EventCategory } from "../types/EventCategory";

export interface EventProps {
    id: string;
    name: string;
    location: string;
    date: Date;
    category: EventCategory;
    description?: string;
    participants?: Participant[];
}

export class Event {
    readonly id: string;

    private _name: string;
    private _location: string;
    private _date: Date;
    private _category: EventCategory;
    private _description?: string;

    private participants: Map<string, Participant>;

    constructor(props: EventProps) {
        this.id = props.id;
        this._name = props.name;
        this._location = props.location;
        this._date = props.date;
        this._category = props.category;
        this._description = props.description;
        this.participants = new Map(
            (props.participants ?? []).map((p) => [p.id, p])
        );
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (!value.trim()) {
            throw new Error("A rendezvény neve nem lehet üres!");
        }
        this._name = value;
    }

    get location(): string {
        return this._location;
    }

    set location(value: string) {
        if (!value.trim()) {
            throw new Error("A rendezvény helyszíne nem lehet üres!");
        }
        this._location = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        if (Number.isNaN(value.getTime())) {
            throw new Error("Érvénytelen dátum.");
        }
        this._date = value;
    }

    get category(): EventCategory {
        return this._category;
    }

    set category(value: EventCategory) {
        this._category = value;
    }

    get description(): string | undefined {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    addParticipant(participant: Participant): void {
        if (this.participants.has(participant.id)) {
            throw new Error(`A résztvevő (${participant.fullName}) már regisztrált!`);
        }
        this.participants.set(participant.id, participant);
    }

    removeParticipant(participantId: string): void {
        if (!this.participants.delete(participantId)) {
            throw new Error(`A résztvevő azonosító (${participantId}) nem található.`);
        }
    }

    listParticipants(): Participant[] {
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
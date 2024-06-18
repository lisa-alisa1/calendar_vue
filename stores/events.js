import { defineStore } from 'pinia'

export const useEventStore = defineStore('events', {
    state: () => ({
        events: []
    }),
    actions: {
        addEvent(event) {
            this.events.push(event)
        },
        updateEvent(updatedEvent) {
            const stateEvents = this.events
            const eventToUpdate = stateEvents.find(event => (event.id) == updatedEvent.id)

            Object.assign(eventToUpdate, updatedEvent)
        },
    }
})
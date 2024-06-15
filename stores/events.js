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
            const index = this.events.findIndex(event => event.id === updatedEvent.id)
            if (index !== -1) {
                this.events.splice(index, 1, updatedEvent)
            }
        }
    }
})
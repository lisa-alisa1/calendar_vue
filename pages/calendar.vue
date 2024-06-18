<template>
  <div>
    <div class="hero marketing-hero is-centered is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered has-text-centered">
            <div class="column">
              {{ events }}
              <FullCalendar
                  :options='calendarOptions'
                  ref="FullCalendar"
                  @eventClick="onEventClick"
                  :events="events"
                  @eventDrop="handleEventDrop"
              />

              <AddEventModal
                  :show-modal="showModal"
                  @close="showModal = false"
                  :event-to-edit="eventToEdit"
                  @save-event="saveEvent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { useEventStore } from '~/stores/events'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEventModal from "~/components/AddEventModal.vue";
definePageMeta({
  layout: 'landing',
})

export default {
  components: {AddEventModal, FullCalendar},

  setup() {
    const eventStore = useEventStore()

    const handleEventDrop = (info) => {
      const updatedEvent = {
        ...info.event.extendedProps,
        date: info.event.startStr,
        id: String(info.event.id)
      }
      eventStore.updateEvent(updatedEvent)
    }

    return {
      eventStore,
      handleEventDrop
    }
  },

  data() {
    return {
      showModal: false,
      eventToEdit: null,
      eventData: {
        title: '',
        date: '',
        time: ''
      },
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        eventClick: this.onEventClick,
        eventDrop: this.handleEventDrop,
        editable: true,
        upgradeSize: true,
        headerToolbar: {
          left: "prev,next today",
          center: 'addEventButton',
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"

        },
        customButtons: {
          addEventButton: {
            text: 'Add event...',
            click: this.showAddEventModal
          }
        },
      }
    }
  },

  computed: {
    ...mapState(useEventStore, ['events'])
  },

  methods: {
    showAddEventModal() {
      this.eventToEdit = null
      this.showModal = true
    },

    onEventClick(info) {
      const eventObj = info.event
      this.eventToEdit = {
        id: eventObj.id,
        title: eventObj.title,
        date: eventObj.start.toISOString().substring(0, 10),
        time: eventObj.start.toISOString().substring(11, 16)
      }
      this.showModal = true
    },

    saveEvent(eventData) {
      if (this.eventToEdit) {
        this.eventStore.updateEvent(eventData)
        const calendarEvent = this.$refs.FullCalendar.getApi().getEventById(eventData.id)

        if (calendarEvent) {
          calendarEvent.setProp('title', eventData.title)
          calendarEvent.setStart(`${eventData.date}T${eventData.time}`)
        }
      } else {
        eventData.id = Date.now()
        this.eventStore.addEvent(eventData)
        this.$refs.FullCalendar.getApi().addEvent({
          id: eventData.id,
          title: eventData.title,
          start: `${eventData.date}T${eventData.time}`
        })
      }
      this.showModal = false
    },
  },
}
</script>


<style>
.fc .fc-daygrid-event {
  background-color: var(--primary);
  color: white;
  height: 3rem;
  margin-top: 5px;
  border: none;
}

.is-dark {
  a {
    color: white;
  }
  .fc-daygrid-day-top .fc-daygrid-day-number {
    color: white;
  }
}

div.fc-daygrid-day-frame  {
  background: rgba(76, 76, 76, 0.03);
}

a {
  color: var(--fc-neutral-text-color);
}

tbody {
  tr {
    .fc-scrollgrid-section .fc-scrollgrid-section-body  .fc-scrollgrid-section-liquid {
      height: 40px;
    }
  }
}

.fc .fc-timegrid-slot {
  height: 3.5rem;
}

thead th.fc-col-header-cell  {
  background:rgba(76, 76, 76, 0.03);
}

</style>



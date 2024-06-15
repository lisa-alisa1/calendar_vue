<template>
  <div>
    <div class="hero marketing-hero is-centered is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered has-text-centered">
            <div class="column">
              <FullCalendar :options='calendarOptions' ref="FullCalendar">

              </FullCalendar>
              <AddEventModal
                  :show-modal="showModal"
                  @close="showModal = false"
                  @add-event="addEventToCalendar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      showModal: false,
      eventData: {
        title: '',
        date: '',
        time: ''
      },
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: true,
        initialEvents: [
          { title: 'nice event', start: new Date() }
        ],
        headerToolbar: {
          left: "prev,next today",
          center: 'addEventButton',
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"

        },
        customButtons: {
          addEventButton: {
            text: 'Add event...',
            click: this.addEventToCalendar
          }
        },
        dateClick: this.handleDateClick,
        events: []
      }
    }
  },
  methods: {
    handleDateClick() {
      this.showModal = true
    },
    addEventToCalendar(eventData) {
      this.showModal = true
        this.$refs.FullCalendar.getApi().addEvent(eventData);
      }
    }
}
</script>



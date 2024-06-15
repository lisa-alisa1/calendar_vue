<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3> Add event </h3>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <label>
          Event name:
          <input type="text" v-model="eventData.title" class="input" />
        </label>
        <label>
          Date:
          <input type="date" v-model="eventData.date" class="input" />
        </label>
        <label>
          Time:
          <input type="time" v-model="eventData.time" class="input" />
        </label>
      </div>
      <div class="modal-footer">
        <button  class="button v-button" @click="closeModal">Close</button>
        <button
            class="button v-button add-button"
            @click="saveEvent"
        >
          {{ isEditing ? 'Save' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showModal','eventToEdit'],
  data() {
    return {
      isEditing: false,
      eventData: {
        title: '',
        date: '',
        time: ''
      }
    };
  },
  watch: {
    eventToEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          console.log('newVal', newVal)
          this.isEditing = true
          this.eventData = {
            id: newVal.id,
            title: newVal.title,
            time: newVal.time
          }
        } else {
          this.isEditing = false
          this.clearEventData()
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveEvent() {
      const { title, date, time } = this.eventData

      if (!title || !date || !time) {
        alert('Заполните все поля')
        return
      }

      const dateTimeStr = `${date}T${time}`
      const eventDateTime = new Date(dateTimeStr)

      if (isNaN(eventDateTime.getTime())) {
        alert('Неверный формат даты и времени')
        return
      }

      this.$emit('save-event', {
        ...this.eventData,
        start: eventDateTime
      })

      this.closeModal()
      this.clearEventData()
    },
    clearEventData() {
      this.eventData = {
        title: '',
        date: '',
        time: ''
      }
    }
  }
}
</script>


<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background: white;
    padding: 20px 30px;
    border-radius: 10px;
    width: 500px;
    max-width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    position: relative;

    .modal-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .modal-header h3 {
      margin: 0;
    }

    .close-button {
      background: transparent;
      border: none;
      font-size: 1.5em;
      cursor: pointer;
    }

    .modal-body {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: start;
      width: 100%;

      label {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;

        .input {
          width: 100%;
          margin: 5px 0 5px 0;
        }
      }
    }

    .modal-footer {
      margin-top: 5%;
      text-align: right;
      width: 100%;
      display: flex;
      justify-content: space-between;

      button.add-button {
        background-color: var(--primary);
      }
    }
  }
}

.is-dark {
  .modal {
    background: color-mix(in oklab, var(--dark-sidebar), black 4%);;
  }
}

.fc .fc-scrollgrid-liquid {
  background: #1a1a1f;
}
</style>
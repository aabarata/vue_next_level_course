<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect class="field"
                  label="Select a category"
                  :options="categories"
                  v-model="event.category">
      </BaseSelect>

      <h3>Name & describe your event</h3>
      <BaseInput class="field"
                  label="Title"
                  type="text"
                  placeholder="Add a title" 
                  v-model="event.title">
      </BaseInput>
      <BaseInput class="field"
                  label="Description"
                  type="text"
                  placeholder="Add a description" 
                  v-model="event.description">
      </BaseInput>

      <h3>Where is your event?</h3>
      <BaseInput class="field"
                  label="Location"
                  type="text"
                  placeholder="Add a location" 
                  v-model="event.location">
      </BaseInput>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <BaseSelect class="field"
                  label="Select a time"
                  :options="times"
                  v-model="event.time">
      </BaseSelect>

      <BaseButton type="submit" 
                  buttonClass="-fill-gradient">
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>

  import Datepicker from 'vuejs-datepicker'
  import NProgress from 'nprogress'

  export default {
    components: {
      Datepicker
    },
    data() {
      const times = []
      for (let i = 1; i <= 24; i++) {
        times.push(i + ':00')
      }
      return {
        times,
        categories: this.$store.state.categories,
        event: this.createFreshEventObject()
      }
    },
    methods: {
      createEvent() {
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done();
          })
      },
      createFreshEventObject() {
        const user = this.$store.state.user.user
        const id = Math.floor(Math.random() * 10000000)

        return {
          id: id,
          user: user,
          category: '',
          organizer: user,
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          attendees: []
        }
      }
    }
  }

</script>

<style scoped>

  .field {
    margin-bottom: 24px;
  }

</style>

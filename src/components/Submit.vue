<template>
  <div>
    <form @submit.prevent="sendDataToServer">
      <!-- form inputs here -->
      <button type="submit">Odoslať</button>
    </form>
    <div v-if="showSuccess">Úspešne odoslané</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {},
      showSuccess: false
    }
  },
  methods: {
    async sendDataToServer() {
      try {
        const response = await axios.post('/server/url', this.formData)
        if (response.data === true) {
          this.addNewDiv()
        }
      } catch (error) {
        console.error(error)
      }
    },
    addNewDiv() {
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 3000)
      const audio = new Audio('/path/to/sound.mp3')
      audio.play()
    }
  }
}
</script>

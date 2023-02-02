// Nepoužívam

<template>
  <div>
    <button
      class="
        bg-green-500
        hover:border-green-600 hover:bg-green-600
        dark:bg-green-600 dark:hover:border-green-500 dark:hover:bg-green-500
        text-white
        font-bold
        mx-auto
        py-2
        px-4
        rounded
        focus:outline-none focus:shadow-outline
        shadow-lg
        btn
      "
      @click="sendDataToServer"
    >
      Potvrdiť
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      receivedData: null,
    };
  },

  methods: {
    async sendDataToServer() {
      try {
        const response = await axios.post("rado-servisa", {
          data: "your-data",
        });
        this.receivedData = response.data;
        if (this.receivedData === true) {
          alert("Prijaté");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>


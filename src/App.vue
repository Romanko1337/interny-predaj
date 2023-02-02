<template>
  <!-- Dark mode -->
  <button
    @click="toggleDark(), (show = !show)"
    class="
      bg-slate-200
      dark:bg-gray-700
      p-0
      border-0
      w-10
      dark:rounded-full
      transition-all
      hover:rotate-180
      duration-1000
    "
  >
    <img v-if="!isDark" src="/images/moon-dark.png" class="bg-stone-200" />
    <Transition>
      <p v-if="isDark">
        <img src="/images/sun-dark.png" class="dark:bg-slate-900" />
      </p>
    </Transition>
  </button>
  <div class="w-full md:w-96 md:mx-auto md:my-5 p-0">
    <!-- Formulár -->
    <form
      @submit.prevent="getLogin"
      id="form"
      class="
        bg-white
        dark:bg-slate-700 dark:shadow-black
        shadow-lg
        rounded
        px-5
        pt-6
        pb-8
        mb-4
      "
    >
      <!-- LOGO -->
      <img
        class="p-5 mb-8 mx-auto w-50 dark:bg-slate-200 dark:rounded-3xl"
        src="/images/logo.svg"
        alt="eTabletka"
      />

      <!-- Číslo objednávky -->
      <div class="mb-4">
        <label
          class="
            text-etabletka-blue text-gray-700
            dark:text-white
            text-left
            block
            text-sm
            font-bold
            mb-2
            text-lg
          "
          for="order-id"
        >
          Číslo objednávky
        </label>
        <input
          name="text"
          type="text"
          pattern="[0-9]*"
          placeholder="1547089"
          v-model="loginForm.text"
          v-bind:class="{ 'valid:border-green-400': textValid }"
          id="order-id"
          required
          minlength="5"
          class="
            valid:border-green-400
            placeholder:dark:text-white
            dark:text-white dark:bg-slate-500
            text-etabletka-blue text-gray-700
            shadow-lg
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            leading-tight
            focus:outline-none focus:shadow-outline
            text-lg
            required
          "
        />
      </div>

      <!-- Pin kód -->
      <div class="mb-6">
        <label
          class="
            dark:text-white
            text-etabletka-blue text-gray-700 text-left
            block
            text-sm
            font-bold
            mb-2
            text-lg
            required
          "
          for="password"
        >
          Pin kód
        </label>
        <input
          required
          name="password"
          type="password"
          placeholder="****"
          minlength="4"
          maxlength="4"
          v-model="loginForm.password"
          v-bind:class="{ 'valid:border-green-400': passwordValid }"
          class="
            valid:border-green-400
            required
            placeholder:dark:text-white
            text-gray-700
            dark:text-white dark:bg-slate-500
            shadow-lg
            border
            rounded
            w-full
            py-2
            px-3
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
            text-lg
          "
        />
      </div>

      <!-- Button -->
      <div class="items-center justify-between m-auto" id="div-submit">
        <button
          @click="sendDataToServer"
          type="submit"
          v-bind:disabled="!passwordValid || !textValid"
          v-bind:class="{
            'valid:border-green-400': passwordValid, textValid,
          }"
          id="submit"
          class="
            disabled:bg-slate-400
            disabled:hover:border-slate-400
            disabled:dark:bg-slate-400
            disabled:dark:hover:border-slate-400
            bg-green-500
            hover:border-green-600 hover:bg-green-600
            dark:bg-green-600
            dark:hover:border-green-500
            dark:hover:bg-green-500
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
        >
          Potvrdiť
        </button>

        <!-- <Submit></Submit> -->
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<script>
import Submit from "./components/Submit.vue";
import axios from "axios";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const show = ref(true);

export default {
  name: "App",
  components: {
    Submit,
  },
  data() {
    return {
      inputValue: "",
      loginForm: {
        text: "",
        password: "",
      },
      receivedData: null,
    };
  },

  computed: {
    passwordValid() {
      return (
        this.loginForm.password.length >= 4 &&
        this.loginForm.password.match(/^[0-9]+$/)
      );
    },
    textValid() {
      return (
        this.loginForm.text.length >= 5 &&
        this.loginForm.text.match(/^[0-9]+$/)
      );
    },
  },

  methods: {
    getLogin() {
      console.log("Posielam do konzole", this.loginForm);
    },
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


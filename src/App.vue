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

  <div class="w-full md:w-96 md:mx-auto md:my-5 p-0 pt-0">
    <!-- Formulár -->
    <form
      @submit.prevent=""
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
        class="
          p-5
          mb-8
          mx-auto
          w-50
          dark:bg-slate-200 dark:rounded-3xl dark:shadow-lg
        "
        src="/images/logo.svg"
        alt="eTabletka"
      />

      <!-- Číslo objednávky -->
      <div class="mb-4">
        <label
          class="
            text-gray-700
            dark:text-white
            text-left
            block
            font-bold
            mb-2
            text-lg
          "
          for="order-id"
        >
          Číslo objednávky
        </label>
        <input
          required
          name="text"
          type="text"
          pattern="[0-9]*"
          placeholder="1547089"
          v-model="loginForm.text"
          v-bind:class="{ 'valid:border-green-400': textValid }"
          id="order-id"
          minlength="5"
          class="
            valid:border-green-400
            placeholder:dark:text-white
            dark:text-white dark:bg-slate-500
            text-gray-700
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
          for="password"
          class="
            dark:text-white
            text-gray-700 text-left
            block
            font-bold
            mb-2
            text-lg
            required
          "
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

      <!-- Button submit -->
      <div class="items-center justify-between m-auto" id="div-submit">
        <button
          @click="sendDataToServer"
          type="submit"
          v-bind:disabled="!passwordValid || !textValid"
          v-bind:class="{
            'valid:border-green-400': passwordValid,
            textValid,
          }"
          id="submit"
          class="
            disabled:bg-slate-400
            disabled:hover:bg-slate-500
            disabled:hover:border-slate-400
            disabled:dark:bg-slate-400
            disabled:dark:hover:border-slate-400
            disabled:dark:hover:bg-slate-300
            disabled:dark:border-slate-400
            bg-green-500
            hover:border-green-600 hover:bg-green-600
            dark:bg-green-600
            dark:hover:border-green-500
            dark:hover:bg-green-500
            dark:border-green-600
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
      </div>
    </form>
    <transition-group name="fade" tag="div">
      <div
        v-for="(data, index) in loginFormList"
        :key="index"
        id="newDiv"
        class="
          flex-start
          rounded
          bg-white
          text-lg
          shadow-lg
          py-2
          my-2
          text-gray-700
          dark:text-white dark:bg-slate-500 dark:shadow-lg dark:shadow-black
        "
      >
        <b>{{ data.text }}</b> -
        {{
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </div>
    </transition-group>
    <!-- <Submit></Submit> -->
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
      show: false,
      loginForm: {
        text: "",
        password: "",
      },
      loginFormList: [],
    };
  },

  computed: {
    passwordValid() {
      return this.loginForm.password.length >= 4;
    },
    textValid() {
      return (
        this.loginForm.text.length >= 5 && this.loginForm.text.match(/^[0-9]+$/)
      );
    },
  },

  methods: {
    async sendDataToServer() {
      try {
        const response = await axios.post("/server/url", this.loginForm);
        if (response.data === true) {
          this.addNewDiv();
        }
      } catch (error) {
        console.error(error);
      }
    },
    addNewDiv() {
      this.loginFormList.unshift({ text: this.loginForm.text });
      setTimeout(() => {
        this.loginFormList.shift();
      }, 3000);
      const audio = new Audio('/sound.mp3')
      audio.play()
    },
  },
};
</script>
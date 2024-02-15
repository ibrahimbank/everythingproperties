// store.js
import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state: {
    states: [],
    formData: {
      firstname: "",
      lastname: "",
      homeAddress: "",
      streetAddress: "",
      state: "",
    },
  },

  getters: {
    getAllStates: (state) => state.states,
    getFormData: (state) => state.formData,
  },

  actions: {
    async fetchStates({ commit }) {
      try {
        const response = await axios.get(
          "https://nigeria-states-towns-lga.onrender.com/api/all"
        );
        const states = response.data;

        commit("SET_STATES", states);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    },
    submitFormData({ commit }, formData) {
      commit("SET_FORM_DATA", formData);
    },
  },

  mutations: {
    SET_STATES(state, states) {
      state.states = states;
    },
    SET_FORM_DATA(state, formData) {
      state.formData = formData;
    },
  },
});

export default store;

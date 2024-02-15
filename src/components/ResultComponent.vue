<template>
  <div class="home-wrapper">
    <div class="landing-page">
      <div class="overlay">
        <div class="result-details">
          <h1 class="heading">Form Details</h1>
          <div class="details">
            <p class="detail-para">First Name</p>
            <span class="span"> {{ formDatas.firstname }}</span>
          </div>
          <div class="details">
            <p class="detail-para">Last Nam</p>
            <span class="span">{{ formDatas.lastname }}</span>
          </div>
          <div class="details">
            <p class="detail-para">Home Address</p>
            <span class="span">{{ formDatas.homeAddress }}</span>
          </div>
          <div class="details">
            <p class="detail-para">Street Address</p>
            <span class="span">{{ formDatas.streetAddress }}</span>
          </div>
          <div class="details">
            <p class="detail-para">State:</p>
            <span class="span">{{ formDatas.state }}</span>
          </div>

          <ul>
            <li
              v-for="mappedState in mappedStates"
              :key="mappedState.capital"
              class="list"
            >
              <div class="details">
                <p class="detail-para">Region</p>
                <span class="span">{{ mappedState?.region }}</span>
              </div>
              <div class="details">
                <p class="detail-para">Deputy Governor</p>
                <span class="span">{{ mappedState?.deputyGovernor }}</span>
              </div>
              <div class="details">
                <p class="detail-para">State Slogan</p>
                <span class="span">{{ mappedState?.stateSlogan }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultComponent",
  created() {
    this.$store.dispatch("fetchStates");
  },

  computed: {
    states() {
      return this.$store.getters.getAllStates;
    },
    formDatas() {
      return this.$store.getters.getFormData;
    },
    mappedStates() {
      return this.usersState();
    },
  },

  methods: {
    usersState() {
      const selectedState = this.formDatas.state;
      console.log(selectedState);
      console.log(this.formDatas.state);
      return this.states
        .filter((state) => state.name === selectedState)
        .map((state) => ({
          deputyGovernor: state?.politics?.deputy_governor,
          region: state.state_code,
          stateSlogan: state.total_area,
          name: state.name,
        }));
    },
  },
};
</script>

<style scoped>
.home-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #306;
  background: #306;
}
.landing-page {
  background-image: url("/src/assets/office.jpeg");
  background-size: cover;
  background-position: center;
  height: 100%;
  position: relative;
  width: 100%;
}

.overlay {
  background-color: rgba(17, 16, 73, 0.5);
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media screen and (max-width: 1200px) {
  .landing-page {
    overflow-x: hidden;
  }

  .overlay {
    flex-direction: column;
    padding: 5rem 0rem !important;
    height: 100vh;
  }
}
.result-details {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
}

@media screen and (max-width: 1200px) {
  .result-details {
    width: 80%;
  }
}

.heading {
  font-size: 30px;
  font-weight: 800;
}
.span {
  font-size: 12px;
  font-weight: 500;
}

.detail-para {
  font-size: 15px;
  font-weight: 600;
}

.list,
.result-details {
  display: flex;
  flex-direction: column;

  gap: 20px;
}
</style>

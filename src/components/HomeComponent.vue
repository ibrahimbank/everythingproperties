<template>
  <div class="home-wrapper">
    <div class="landing-page">
      <div class="overlay">
        <div class="company-info">
          <h1>Everything Property Ltd</h1>
          <p>
            Serviced Properties for rent Furnished Properties for rent Newly
            Built Properties for rent Cheap Properties for rent Luxury
            Properties for rent Serviced Properties for sale Furnished
            Properties for sale Newly Built Properties for sale Cheap Properties
            for sale Luxury Properties for sale
          </p>
        </div>

        <!-- Contact Form -->
        <div class="contact-form">
          <h2>Contact Us</h2>

          <!-- <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    :counter="10"
                    label="First name"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="lastname"
                    :rules="nameRules"
                    :counter="10"
                    label="Last name"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form> -->

          <form>
            <div class="fullName">
              <div class="name">
                <label for="name">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  value="firstname"
                  @input="(event) => (text = event.target.value)"
                  v-model="firstname"
                />
                <div v-if="errors.firstname" class="error-message">
                  {{ errors.firstname }}
                </div>
              </div>

              <div class="name">
                <label for="lastname">Last Name</label>
                <input
                  type="lastname"
                  id="lastname"
                  name="lastname"
                  required
                  v-model="lastname"
                  value="lastname"
                  @input="(event) => (text = event.target.value)"
                />
                <div v-if="errors.lastname" class="error-message">
                  {{ errors.lastname }}
                </div>
              </div>
            </div>

            <div class="homeAddress">
              <label for="homeAddress">Home Address</label>
              <input
                type="homeAddress"
                id="homeAddress"
                name="homeAddress"
                required
                value="homeAddress"
                @input="(event) => (text = event.target.value)"
                v-model="homeAddress"
              />
              <div v-if="errors.homeAddress" class="error-message">
                {{ errors.homeAddress }}
              </div>
            </div>

            <div class="street">
              <label for="streetAddress">Street Address</label>
              <input
                type="streetAddress"
                id="streetAddress"
                name="streetAddress"
                required
                value="streetAddress"
                @input="(event) => (text = event.target.value)"
                v-model="streetAddress"
              />

              <div v-if="errors.streetAddress" class="error-message">
                {{ errors.streetAddress }}
              </div>
            </div>
            <div class="stabtn">
              <div class="state">
                <label for="State">State</label>
                <select
                  type="state"
                  id="State"
                  name="state"
                  required
                  value="state"
                  @input="(event) => (text = event.target.value)"
                  v-model="state"
                >
                  <option disabled value="">Please select one</option>
                  <option v-for="state in getStates" :key="state.capital">
                    {{ state.name }}
                  </option>
                </select>

                <div v-if="errors.state" class="error-message">
                  {{ errors.state }}
                </div>
              </div>

              <button
                @click.prevent="submitForm"
                type="submit"
                class="submit-button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    homeAddress: "",
    streetAddress: "",
    state: "",
    errors: {},
    states: [],
  }),
  created() {
    this.$store.dispatch("fetchStates");
  },

  computed: {
    getStates() {
      return this.$store.getters.getAllStates;
    },
    formDatas() {
      return this.$store.getters.getFormData;
    },
  },

  methods: {
    submitForm() {
      this.errors = {};

      if (!this.firstname) {
        this.errors.firstname = "first name is required.";
        return;
      }

      if (!this.lastname) {
        this.errors.lastname = "last name is required.";
        return;
      }

      if (!this.homeAddress) {
        this.errors.homeAddress = "Home Address is required.";
        return;
      }

      if (!this.streetAddress) {
        this.errors.streetAddress = "Street Address is required.";
        return;
      }

      if (!this.state) {
        this.errors.state = "State is required.";
        return;
      }

      if (Object.keys(this.errors).length === 0) {
        console.log("Form submitted successfully");
        this.$store.dispatch("submitFormData", {
          firstname: this.firstname,
          lastname: this.lastname,
          homeAddress: this.homeAddress,
          streetAddress: this.streetAddress,
          state: this.state,
        });
        this.$store.dispatch("fetchStates");
        this.$router.push("/result");
      } else {
        console.log("Form has validation errors");
      }
    },

    navigateToAnotherPage() {
      // Use $router.push to navigate to another page
      this.$router.push("/another-page");
    },
    loadStates: async function () {
      console.log("clicked");
      this.states = await this.$store.dispatch("fetchStates");
    },
  },
};
</script>

<style>
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
  justify-content: space-evenly;
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
    height: auto;
  }
}

.company-info {
  color: white;
  text-align: center;
  margin-bottom: 40px;
  width: 40%;
}
@media screen and (max-width: 1200px) {
  .company-info {
    width: 80%;
    margin-top: 1rem !important;
  }
}
.company-info h1 {
  font-size: 3rem;
  margin-bottom: 10px;

  font-size: 60px;
  font-weight: 900;
}

.company-info p {
  font-size: 1rem;
  font-weight: 500;
  line-height: 30px;
}

.error-message {
  color: red;
}

.contact-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
}

@media screen and (max-width: 1200px) {
  .contact-form {
    width: 80%;
    margin-bottom: 15rem !important;
  }
}

.contact-form h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

form {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

label {
  margin-bottom: 5px;
}

input,
textarea,
select {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc !important;
  border-radius: 10px !important;
  width: 100%;
}

.fullName {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
}

@media screen and (max-width: 1200px) {
  .fullName {
    flex-direction: column;
  }
}

.name {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.street {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.state {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 50%;
}

.homeAddress {
  display: flex;
  flex-direction: column;
}
.stabtn {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 20px;
}

button {
  background-color: #306 !important;
  color: white !important;
  padding: 10px;
  width: 50%;
  border: none;
  margin-top: 1rem;
  border-radius: 10px !important;
  cursor: pointer;
}
</style>

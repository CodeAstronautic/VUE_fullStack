<template>
  <div>
    <Home />

    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <h2>Add Post</h2>
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="tutorial.title"
            name="title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            id="description"
            required
            v-model="tutorial.description"
            name="description"
          />
        </div>

        <button @click="saveTutorial" class="btn btn-success">Submit</button>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Home from "./Home";
export default {
  components: {
    Home,
  },
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        name: "",
        email: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      let token = localStorage.getItem("jwt");
      axios
        .post("http://localhost:4000/post/p", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

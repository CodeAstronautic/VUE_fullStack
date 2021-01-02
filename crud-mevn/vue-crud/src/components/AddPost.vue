<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.name"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Email</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.email"
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
</template>

<script>

import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
       name:"",
       email:""
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        name: this.tutorial.name,
        email: this.tutorial.email
      };

      TutorialDataService.creates(data)
        .then(response => {
          this.tutorial.id = response.data.id;
         
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

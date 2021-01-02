<template>
  <div v-if="post" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="post.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="post.description"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Posts...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "tutorial",
  data() {
    return {
      post: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      let token = localStorage.getItem("jwt");
      axios
        .get(`http://localhost:4000/post/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          id,
        })
        .then((response) => {
          this.post = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTutorial() {
      axios
        .delete("http://localhost:4000/post/5feec0587bd85f40f2b41868")
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "home" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateTutorial() {
      var data = {
        title: this.post.title,
        description: this.post.description,
      };
      let token = localStorage.getItem("jwt");
      console.log(token);
      axios
        .put(
          `http://localhost:4000/post/5feec0587bd85f40f2b41868`,

          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

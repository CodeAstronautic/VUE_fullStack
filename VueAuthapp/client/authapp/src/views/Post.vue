<template>
  <div>
    <div id="app">
      <Home />
    </div>
    <div class="search">
      <input
        type="text"
        class="width"
        placeholder="Search by title"
        v-model="title"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="searchTitle"
      >
        Search
      </button>
    </div>
    <center>
      <ul class="list-group wid">
        <li
          class="list-group-item search"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in info"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
    </center>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentTutorial.description }}
        </div>

        <router-link
          :to="'/post/' + currentTutorial._id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import Home from "./Home";
export default {
  components: {
    Home,
  },
  data() {
    return {
      info: [],
      title: "",
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  },
  methods: {
    searchTitle() {
      let token = localStorage.getItem("jwt");
      console.log(token);
      axios
        .get(`http://localhost:4000/post/me/?title=${this.title}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          this.info = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log("Error in getting title", e);
        });
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },
  },
  mounted() {
    let token = localStorage.getItem("jwt");
    axios
      .get(
        "http://localhost:4000/post/me",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.info = response.data;
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.wid {
  width: 100px;
}
.search {
  display: flex;
  justify-content: center;
  margin-top: 42px;
}
.width {
  width: 200px;
}
.margin {
  margin-top: 30px;
}
</style>

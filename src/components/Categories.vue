<template>
<v-container>
    <v-row>
      <v-col
        v-for="item in info"
          :key="item.id"
          cols="12"
          sm="4">
        <v-card hover>
          <v-card-title v-on:click="questions(item.id)">{{item.name}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <div class="footer" v-if="ready">Fork me on <a href="https://github.com/mluisamc/trivia-quiz">GitHub</a></div>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Categories',
  data(){
    return {
      info: null,
      ready: false
    }
  },
  mounted () {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(response => {
        this.info = response.data.trivia_categories; 
        this.ready = true;
      })
  },
  methods: {
    questions(category){
      this.$router.push({name: 'questions', params : { category: category}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #2c3e50;
}
.v-card{
  color: #2c3e50 !important;
  border-color: #2c3e50 !important;
  border-radius: 0 !important;
  background-color: #d1dae3 !important;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
}

.v-card__title{
  padding: 1rem;
  word-break: normal;
}

.footer {
  margin-top: 1rem;
}
</style>

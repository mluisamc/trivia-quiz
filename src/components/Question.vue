<template>
<v-container>
    <v-row>
      {{questions_result}}
    </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Question',
  data(){
    return {
      questions_result: null
    }
  },
  mounted () {
      axios
        .get('https://opentdb.com/api.php?amount=10&category=' + this.$route.params.category + '&type=multiple')
        .then(response => (this.questions_result = response.data.results))
  },
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
}

.footer {
  margin-top: 1rem;
}
</style>

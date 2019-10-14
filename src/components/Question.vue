<template>
<v-container v-if="questions.length > 0">
    <div class="question">{{decode(questions[question_number].question)}}</div>
    <v-row>
      <v-col
        v-for="item in questions[question_number].answers"
          :key="item.id"
          cols="12"
          sm="4"
          offset-sm="4">
        <v-card hover>
          <v-card-title 
            v-bind:class="{ green: success && index == item, red: success !== null && !success && index == item }" 
            v-on:click="checkSuccess(item)">{{decode(item.answer)}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Question',
  data(){
    return {
      questions_result: null,
      questions: [],
      success: null,
      index : null,
      question_number: 0,
      result: 0
    }
  },
  mounted () {
      axios
        .get('https://opentdb.com/api.php?amount=10&category=' + this.$route.params.category + '&type=multiple')
        .then(response => {
          this.questions_result = response.data.results
          for (let i = 0; i < this.questions_result.length; i++) {
            let answers = []
            let random = Math.floor((Math.random() * 4) + 1);
            let correct_inserted = false;
            for (let j = 0; j < this.questions_result[i].incorrect_answers.length; j++) {
              const answer = this.questions_result[i].incorrect_answers[j];
                if (random == answers.length + 1) {
                  answers.push({
                    answer: this.questions_result[i].correct_answer,
                    correct: true
                  })
                  correct_inserted = true;
                }
                answers.push({
                  answer: answer,
                  correct: false
                })      
            }
            if(!correct_inserted){
              answers.push({
                    answer: this.questions_result[i].correct_answer,
                    correct: true
                  })
            }            
            this.questions.push({
              question: this.questions_result[i].question,
              answers: answers
            });
          }
        })
  },
  methods : {
    checkSuccess(answer){
      if (answer.correct) {
        this.success = true;
        this.result++;
      }
      else {
        this.success = false;
      }
      this.index = answer;
      var self = this;
      if (this.question_number !== 9){
        setTimeout(function(){ 
          self.question_number++; 
          self.success = null;
          }, 1000);  
      }
      else {
        setTimeout(function(){ 
          self.$router.push({name: 'result', params : { result: self.result * 10}});
          }, 1000);
      } 
    },
    decode(html){
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
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
}

.question{
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500; 
}

.green {
  background-color: #9ed79e;
}

.red {
  background-color: #f09a9a;
}
</style>

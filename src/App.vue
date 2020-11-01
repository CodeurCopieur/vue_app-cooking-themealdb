<template>
  <div id="app">
      <div class="container" style="height: 100vh;">

        <h1 class="title has-text-link has-text-centered mt-5">Cuisiner pour tous</h1>

        <div class="field is-horizontal is-justify-content-center is-align-items-center my-2">
          
          <div class="field mb-0 column is-6">
            <input class="input is-rounded" type="text" placeholder="Entrez un nom de plat ou ingrédient" v-model="meal" @input="searchMeal">
            
          </div>

          <div class="field has-text-centered">
               <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button class="button is-link is-rounded" @click="updateMeal">
                      Choisir un plat au hasard
                    </button>
                  </div>
                </div>
              </div>
          </div>

        </div>

        <!-- composant succes resultat -->
        <article class="message is-link"  v-if="meal && activeMeals && filteredMeal.length >= 1">
          <div class="message-header">
            <p>Success</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            {{ filteredMeal.length }} resultat<span v-if="filteredMeal.length >= 2">s</span>
          </div>
        </article>
        
        <!-- composant succes resultat -->
        <article class="message is-danger" v-if="meal && activeMeals && filteredMeal.length == 0">
          <div class="message-header">
            <p>Danger</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            Désolé, aucun resultat
          </div>
        </article>

          <div id="searchContainer" class="columns is-multiline is-variable"  v-if="activeMeals && filteredMeal.length >= 1">
            <div class="column card is-3 is-12-mobile" v-for="meal in meals" :key="meal.idMeal">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="meal.strMealThumb" :alt="meal.strMeal">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img :src="meal.strMealThumb" :alt="meal.strMeal">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">
                      {{ meal.strMeal }}
                    </p>
                
                  </div>
                </div>
                <div class="content">
                    <p>Category : {{ meal.strCategory }}</p>
                    <p>Origine : {{ meal.strArea }}</p>
                    <p >Tags : <span class="tag is-success">{{meal.strTags}}</span></p>
                    <div class="card-footer">
                      <div class="card-footer-item p-0">
                        <a :href="meal.strYoutube" target="_blank"><YoutubeL/></a>
                    
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          
        <div class="columns is-justify-content-center" v-if="activeMeal">

          <div class="column is-one-third">
              <div class="card is-6"  v-for="meal in ramdomMeal" :key="meal.idMeal">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="meal.strMealThumb" :alt="meal.strMeal">
                  </figure>
                </div>
                <header class="card-header">
                  <p class="card-header-title">
                    {{ meal.strArea}}
                  </p>
                </header>
                <div class="card-content pb-0">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img :src="meal.strMealThumb" :alt="meal.strMeal">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">
                        {{ meal.strMeal }}
                      </p>
                  
                    </div>
                  </div>
                  <div class="content">
                    <p>Category : {{ meal.strCategory }}</p>
                    <p >Tags : <span class="tag is-success">{{meal.strTags}}</span></p>
                    <div class="card-footer">
                      <div class="card-footer-item p-0">
                        <a :href="meal.strYoutube" target="_blank"><YoutubeL/></a>
                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

        </div>

      </div>
  </div>
</template>

<script>

import YoutubeL from 'vue-ionicons/dist/logo-youtube'

export default {
  name: 'App',
  components: {
    YoutubeL
  },
  data() {
    return {
      meal: null,
      meals: [],
      activeMeals: false,
      ramdomMeal: null,
      activeMeal: true
    }
  },
  mounted() {
    this.updateMeal()
  },
  methods: {
    searchMeal() {

      
      this.activeMeals = true

      return this.$http.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.meal}`)
            .then( response => {
               this.meals = response.data.meals;
               this.activeMeal = false
            })
            .catch(error => {
              console.log(error);
            })
    },
    updateMeal() {
      
      this.activeMeals = false
      this.activeMeal = true
      return this.$http.get(`https://www.themealdb.com/api/json/v1/1/random.php`).then( res => this.ramdomMeal = res.data.meals)
      
    }
  },
  computed: {
    filteredMeal() {
       return this.meals.filter((meal) => {
         return meal.strMeal.toLowerCase().includes(this.meal.toLowerCase());
       })
     }
  }
}
</script>

<style>

*, ::before, ::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

a {
  text-decoration: none;
  font-size: 40px;
  display: inline-block;
}

ul, li {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

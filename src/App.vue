<template>
  <div id="app">
      <div class="container" style="height: 100vh;">

        <h1 class="title has-text-link has-text-centered">Cuisiner pour tous</h1>

        <div class="field is-horizontal is-justify-content-center is-align-items-center my-2">
          
          <div class="field mb-0 column is-6">
            <input class="input is-rounded" type="text" placeholder="Entrez un nom de plat" v-model="meal" @input="searchMeal">
            
          </div>

          <div class="field has-text-centered">
               <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button class="button is-link is-rounded">
                      Choisir un plat au hasard
                    </button>
                  </div>
                </div>
              </div>
          </div>
          
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      meal: null,
      meals: null
    }
  },
  methods: {
    searchMeal() {
      return this.$http.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.meal}`)
            .then( response => {
              this.meals = response.data.meals;
              console.log(this.meals);
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
}

ul {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

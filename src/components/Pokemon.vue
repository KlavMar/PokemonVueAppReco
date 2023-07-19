<template>

<div class="text-sm lg:flex-grow mx-auto w-full xl:w-1/2 p-3 m-4">
          <div class="relative search-bar">
            <input class="w-full px-4 py-4 xl:py-10  bg-gray-50 font-semibold border border-gray-300  rounded-lg focus:outline-none focus:border-gray-600" 
            type="text" name="search" 
            id="search_pokemon" placeholder="Recherchez" v-model="name"  />
            <ul class="absolute bg-white w-full z-10 top-full left-0 right-0 py-1 mt-1  mx-auto border-2 tags-search text-gray-800" v-if="filteredName.length > 0">
              <li class="item px-3 py-2 font-semibold flex flex-row items-center" v-for="(value, index) in filteredName" :key="index" @click="selectedName(value.name)">
                            
                  <h3 class="text-2xl p-3 m-2 w-1/3">{{ value.name }}</h3>
                  <img :src="`${value.img}`" class="rounded-full p-3 m-2  h-32 w-32 border-gray-800 border-2">     
                  <hr class="text-gray-200">     
                  

     
               
              </li>
              
            </ul>
          </div>
        </div>
  <div aria-label="reco pokemon" class="reco pokemon flex flex-row flex-wrap justify-around">
    <article v-for="(value,index) in pokemon" :key="index" class="relative card-parent  border-8 border-yellow-400 outline  outline-4 outline-yellow-400 p-3 my-5 xl:m-5 w-full xl:w-1/4" :class="`${value.type_1}`">
      <div class="card absolute inset-0 w-full h-full"></div>
      <div class="flex flex-row justify-between items-center">
        <h3 class="text-2xl p-3 m-2 font-bold">{{ value.name }}</h3>
        <p>HP <span class="text-xl font-bold">{{ value.hp }}</span></p>
      </div>
        <figure class="mx-auto flex justify-center items-center border-2  border-gray-300 z-10 bg-gray-50 rounded-lg m-2 p-3 shadow-lg">
          <img :src="`${value.img}`" class="w-8/12">     
        </figure>

        <div class="flex justify-between items-center font-bold text-xl ">
          <h4>Type : </h4><p>{{  value.type }}</p>
        </div>
        <div class="flex justify-between items-center font-bold text-xl ">
          <h4>Abilities : </h4><p>{{  value.abilities }}</p>
        </div>
        <div class="flex flex-col  my-3 p-1 text-xl rounded-lg font-normal ">
         
          <p>{{ value.description }}</p>
        </div>
        <div class="flex flex-row my-3 p-1 text-xl rounded-lg font-bold ">
          <h4>Evolution : </h4><p class="font-semibold evolution " v-for="(name,index) in value.evolution" :key="index" @click="selectedName(name)">{{ name }}&nbsp;</p>
  
       </div>
  
      <div class="font-bold text-lg p-1 m-1">
        <h3 class="my-1">Attack</h3>
        <div class="bg-gray-100 w-full rounded-r-xl ">
          <p :style="{ width: `${value.attack}%`}" style="{max-width: 100%}" class="p-1 bar-histo max-w-full rounded-r-xl">{{ value.attack }}</p>
        </div>
      </div>
      <div class="font-bold text-lg p-1 m-1">
        <h3 class="my-1">Defense</h3>
        <div class="bg-gray-100 w-full rounded-r-xl ">
          <p :style="{ width: `${value.defense}%` }" style="{max-width: 100%}" class="p-1 bar-histo max-w-full rounded-r-xl">{{ value.defense }}</p>
        </div>
      </div>
      <div class="font-bold text-lg p-1 m-1">
        <h3 class="my-1">Attack spe</h3>
        <div class="bg-gray-100 w-full rounded-r-xl ">
          <p :style="{ width: `${value.sp_atk}%` }" style="{max-width: 100%}"  class="p-1 bar-histo max-w-full rounded-r-xl">{{ value.sp_atk }}</p>
        </div>
      </div>
      <div class="font-bold text-lg p-1 m-1">
       <h3 class="my-1">Defense spe</h3>
        <div class="bg-gray-100 w-full rounded-r-xl ">
          <p :style="{ width: `${value.sp_def}%` }" style="{max-width: 100%}"  class="p-1 bar-histo max-w-full rounded-r-xl">{{ value.sp_def }}</p>
        </div>
      </div>

   
  
  </article>

  </div>
</template>
<script>
 import axios from 'axios';
 export default {
    name: "PokemonComponent",
    data:()=> {
    return {
        pokemon:[],
        listName:[],
        name:''
    }
  },

  async created(){
    this.listName = await this.get_name()

  },
  methods:{
    async get_name(){

        await axios.get("http://127.0.0.1:5000/pokemon/name/")
        .then(response =>{this.listName = response.data})

        return this.listName
    },
    async get_reco(name){
      await axios.get(`http://127.0.0.1:5000/pokemon/reco/${name}/`)
        .then(response =>{this.pokemon = response.data})

        return this.pokemon
    },
    selectedName(pok){
          console.log(pok)
          this.name = pok.trim();
          return this.get_reco(this.name)

        },
  },
  computed: {
      filteredName() {
        if (!this.name || this.name === '') {
          return [];
        }
        
        const lowercaseNamePokemon = this.name.toLowerCase();
  


            return this.listName.filter(pok => {
          const lowercaseName = pok.name.toLowerCase();
          return lowercaseName.includes(lowercaseNamePokemon) && lowercaseName !== lowercaseNamePokemon;
        });

    
        
      },

    }
}
</script>
<style>
  body,.bar-histo{
    background-color: #3c5aa6;

  }
  .bar-histo{
    color: rgb(249 250 251);
  }
  .evolution{
    color: #3c5aa6;
  }
  .evolution:hover{
    color:rgb(255,203,5);
  }
.Bug {
background-color:#729f3f

}
.Dark {
background-color:#707070
}
.Dragon {
background:linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)
}
.Electric {
background-color:#eed535
}
.Fairy {
background-color:#fdb9e9;
}
.Fight {
background-color:#d56723
}
.Fire {
background-color:#fd7d24;
}
.Flying {
background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
}
.Ghost {
background-color:#7b62a3
}
.Grass {
background-color:#9bcc50
}
.Ground {
background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);
}
.Ice {
background-color:#51c4e7
}
.Normal {
background-color: #a4acaf
}
.Poison {
background-color:#b97fc9;
}
.Psychic {
background-color:#f366b9
}
.Rock {
background-color:#a38c21
}
.Steel {
background-color:#9eb7b8;
}
.Water {
background-color:#4592c4
}
.Fighting{
background-color: brown;
}


.card-parent{
  filter: brightness(1.25);
}

.card {
  opacity: 1;
  background-image: url("https://assets.codepen.io/13471/sparkles.gif"), url("https://assets.codepen.io/13471/holo.png"), 
    linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
  background-position: 50% 50%;
  background-size: 160%;
  background-blend-mode: overlay;
  z-index: 2;
  /* filter: brightness(1.75); */
  opacity: .3;
}

</style>
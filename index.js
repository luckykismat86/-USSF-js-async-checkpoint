const fetch = require ('node-fetch');
const fs = require ("fs");
var Promise = require('bluebird');

var filePath = 'index.txt';

var pluckPokemonNamesFromFileAsync =  function(filePath) {

    return new Promise(function (resolve, reject) {
        try {
            fs.readFile(filePath, 'utf8', function (err, content){
              if (err) {
                  reject(err);
              }else{ 
                  content = content.split('\r\n');
                  resolve(content);
              }
            });
        }
        catch(err) {
            reject(err);
        }
    });
};

var pokemonPromises = [];

pluckPokemonNamesFromFileAsync(filePath)
.then(function(result) {
   
    result.map(function(element, index) {
      var url = 'https://pokeapi.co/api/v2/pokemon/' + element;
      pokemonPromises[index] = fetch(url);
      Promise.all(pokemonPromises).then(resp => console.log('hello')); 
      console.log(pokemonPromises[index]);
      console.log(url);
    });
  return result;
    
});
Promise.all(pokemonPromises).then(resp => console.log('hello')); 
/*let urls = ['https://pokeapi.co/api/v2/pokemon/',  'https://pokeapi.co/api/v2/pokemon/']

let promises = urls.map('url' => )
return fetch(url)
.then(types: [])
console.log(types)

Promise.all(promises.then)*/
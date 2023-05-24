
const { Pokemon, Type } = require('../db');


const createPokemon = async (name, life, attack, defense, speed, height, weight, types,image) => {
  const data = { name, life, attack, defense, speed, height, weight, types,image };
 

    try{const newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    }); 

 
    
  
    // Agregar los tipos
  for (const typeName of types) {
    const [type] = await Type.findOrCreate({ where: { name: typeName } });
    await newPokemon.addType(type);
  }

  return newPokemon;
}catch (error) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    throw new Error('This Pokémon name is already taken, please choose another one.');
  }

  throw error; // cualquier otro error
}
};

module.exports = {createPokemon}

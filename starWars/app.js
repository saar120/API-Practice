const getData = async () => {
  try {
    const data = await (await fetch("https://swapi.dev/api/films/1/")).json();
    const characters = [];
    for (let i = 0; i < 10; i++) {
      const charData = await (await fetch(data.characters[i])).json();
      const { name, hair_color, height, homeworld } = charData;
      const planetData = await (await fetch(homeworld)).json();
      const planet = { name: planetData.name, population: planetData.population };
      characters.push({
        name: name,
        hair: hair_color,
        height: height,
        planet: planet,
      });
    }
    console.log(characters);
  } catch (e) {}
};

getData();

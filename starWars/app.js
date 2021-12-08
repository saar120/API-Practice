const container = document.querySelector(".characters-container");

const generateCharacter = (data) => {
  // create character
  const character = document.createElement("div");
  character.className = "character";
  const name = document.createElement("h3");
  name.textContent = `Name: ${data.name}`;
  character.appendChild(name);
  const hair = document.createElement("h3");
  hair.textContent = `Hair Color: ${data.hair}`;
  character.appendChild(hair);
  const height = document.createElement("h3");
  height.textContent = `Height: ${data.height}`;
  character.appendChild(height);
  const planet = document.createElement("h3");
  planet.textContent = `Planet: ${data.planet.name}`;
  character.appendChild(planet);
  container.appendChild(character);
};

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
    characters.forEach((char) => generateCharacter(char));
  } catch (e) {
    console.error(e);
  }
};

getData();

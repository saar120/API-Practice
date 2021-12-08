const profileContainer = document.querySelector(".profile-container");
const inputField = document.querySelector("form");
const message = document.querySelector(".message");

//eventListeners
inputField.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(getInput());
});

//functions

function getInput() {
  return document.querySelector("input").value;
}

async function getData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw response;
    message.textContent = "";
    const data = await response.json();
    generateProfile(data);
  } catch (e) {
    const error = (await e.json()).message;
    notFound(error);
    console.error(error);
  }
}


function generateProfile(data) {
  // create profile
  const profile = document.createElement("div");
  profile.className = "profile";
  // create img and add to profile
  const userImage = document.createElement("div");
  userImage.className = "image-container";
  userImage.style.backgroundImage = `url("${data.avatar_url}")`;
  profile.appendChild(userImage);
  // create user name and add to profile
  const userName = document.createElement("h3");
  userName.className = "user-name-holder";
  userName.textContent = data.name;
  profile.appendChild(userName);
  // create repo count and add to profile
  const reposCount = document.createElement("h3");
  reposCount.className = "repos-count-holder";
  reposCount.textContent = `Repos Count: ${data.public_repos}`;
  profile.appendChild(reposCount);
  // append profile to profiles container
  profileContainer.appendChild(profile);
}


function notFound(error){
  message.textContent = error;
}
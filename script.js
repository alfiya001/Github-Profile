
const APIURL = 'https://api.github.com/users/';

const search = document.getElementById('search');
const form = document.getElementById('form');
const main = document.getElementById('main')

// getUser('bradtraversy');
async function getUser(username) {
    try {
        const { data } = await axios.get(APIURL + username);

        createUserCard(data);
        createRepo(username);
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

function addRepoToCard(repos) {
    const reposEle = document.getElementById('repos');

    repos.forEach(repo => {
        const repoEle = document.createElement('a');
        repoEle.classList.add('repo');
        repoEle.href = repo.html_url;
        repoEle.target = '_blank';
        repoEle.innerText = repo.name;

        reposEle.appendChild(repoEle);
    })
}

async function createRepo(username) {
    try {
        const { data } = await axios.get(APIURL + username + '/repos?sort=created');

        addRepoToCard(data);
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="git-card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div class="repos" id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})

const url = "https://api.tvmaze.com/shows";
const moviesContainer = document.getElementById('movies-container');
var filmNum = 15;
const carusel = document.getElementById("caruselItem")

function RandomFilm() {
  let Id = Math.floor((Math.random() * 249 + 1));
  let randomFilmLink = document.getElementById('randomFilmLink');
  randomFilmLink.href = 'series.html?' + Id;
}

axios.get("https://api.tvmaze.com/shows/25").then((post) => {
  carusel.innerHTML += `
    <div class="carousel-item active">
    <a href="series.html?${post.data.id}" class="shadow-lg text-decoration-none">
    <img
    src="${post.data.image.original}"
    class="d-block w-100"
    alt="${post.data.name}"
  />
  <div class="carousel-caption d-none d-md-block">
    <h2>${post.data.name}</h2>
    ${post.data.summary}
  </div>
    </a>
  </div>`
});

axios.get("https://api.tvmaze.com/shows").then((response) => {
  response.data.slice(24, 26).map((post) => {
    carusel.innerHTML += `
    <div class="carousel-item">
    <a href="series.html?${post.id}" class="shadow-lg text-decoration-none">
    <img
      src="${post.image.original}"
      class="d-block w-100"
      alt="${post.name}"
    />
    <div class="carousel-caption d-none d-md-block">
      <h2>${post.name}</h2>
      ${post.summary}
    </div>
    </a>
  </div>`
  });
})



axios.get(url).then((response) => {
  response.data.slice(0, filmNum).map((post) => {
    moviesContainer.innerHTML += `
            <div
              class="card col-3 bg-dark bg-opacity-75 m-3 mx-4 px-2"
              style="width: 19rem"
            >
              <a href="series.html?${post.id}" class="filmImg text-decoration-none">
                <img
                  src="${post.image.original}"
                  class="filmImg card-img-top"
                  alt="${post.name}"
                />
                <span
                  class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb ipc-rating-star-group--imdb text-warning fw-bold"
                  ><svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ipc-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path
                      d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
                    ></path></svg>${post.rating.average}/10</span>
                <p class="card-title fs-4 fw-bold text-light">${post.name}</p>
                <p class="card-text text-light my-1 fw-medium pb-2">${post.premiered}, ${post.network.country.name}, ${post.language}</p>
              </a>
            </div>`
  });
})




async function getMoreMovies() {
  filmNum += 15;
  const response = await axios.get(url);

  const extendedData = Array.from({ length: 1 }, () => response.data.slice(0, filmNum)).flat();

  displayMovies(extendedData);
}

function displayMovies(movies) {

  moviesContainer.innerHTML = '';

  movies.forEach(post => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card col-3 bg-dark bg-opacity-75 m-3 mx-4 px-2';
    cardElement.style.width = '19rem';

    const countryName = post.network && post.network.country && post.network.country.name ? post.network.country.name : 'N/A';
    const language = post.language || 'N/A';

    cardElement.innerHTML = `
      <a href="series.html?${post.id}" class="filmImg text-decoration-none">
        <img src="${post.image.original}" class="filmImg card-img-top" alt="${post.name}" />
        <span class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb ipc-rating-star-group--imdb text-warning fw-bold">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>${post.rating.average}/10
        </span>
        <p class="card-title fs-4 fw-bold text-light">${post.name}</p>
        <p class="card-text text-light my-1 fw-medium pb-2">${post.premiered}, ${countryName}, ${language}</p>
      </a>
    `;

    moviesContainer.appendChild(cardElement);
  });
}
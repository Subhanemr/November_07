
let id = window.location.search.slice(1);
const url = "https://api.tvmaze.com/shows/";
const urlId = `https://api.tvmaze.com/shows/${id}`;
const filmInfo = document.getElementById("filmInfo")
const cardCaruosel = document.getElementById("cardCaruosel")
const cardsWrapper = document.getElementById("cardsWrapper")

function RandomFilm() {
    let Id = Math.floor((Math.random() * 249 + 1));
    let randomFilmLink = document.getElementById('randomFilmLink');
    randomFilmLink.href = 'series.html?' + Id;
}

axios.get(urlId).then((response) => {
    const countryName = response.data.network && response.data.network.country && response.data.network.country.name ? response.data.network.country.name : 'N/A';
    const ended = response.data.ended ? response.data.ended : "N/A"
    filmInfo.innerHTML += `
        <h1 class="postName text-dark fw-bold ">${response.data.name}</h1>
      <div class=" d-flex">
        <img  
          class="card mt-3 w-25 h-100"
          src="${response.data.image.original}"
          alt="${response.data.name}"
        />
        <div class="b-post__infotable_right_inner">
          <table class="b-post__info">
            <tbody>
              <tr>
                <td class="">
                <br>
                  <h4>Rating</h4>
                <br>
                </td>
                <td class="">
                    <span
                    class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb ipc-rating-star-group--imdb text-warning fw-medium"
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
                      ></path></svg>${response.data.rating.average}/10</span>
                </td>
              </tr>
              <tr>
                <td class="">
                  <h4>Premiered</h4>
                </td>
                <td class="">
                  ${response.data.premiered}
                </td>
              </tr>
              <tr>
              <td class="">
              <br>
                <h4>Ended</h4>
              </td>
              <td class="">
              <br>${ended}
              </td>
            </tr>
              <tr>
                <td class="">
                <br>
                  <h4>Status</h4>
                </td>
                <td class="">
                <br>${response.data.status}
                </td>
              </tr>
              <tr>
                <td class="">
                <br>
                  <h4>Country</h4>
                <br>
                </td>
                <td class="">
                  ${countryName}
                </td>
              </tr>
              <tr>
                <td class="">
                  <h4>Genres</h4>
                </td>
                <td class="">
                    ${response.data.genres}
                </td>
              </tr>
              <tr>
                <td class="">
                <br>
                  <h4>Time</h4>
                </td>

                <td itemprop=""><br>${response.data.averageRuntime} min</td>
              </tr>
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class=" fs-5 my-2 pt-2" id="pHere">${response.data.summary}</div>

      <iframe width="80%" height="500" src="https://www.youtube.com/embed/_YAJxvTQxAA?si=Mmo1zXhm4IuCUaxv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

      <p class=" fw-bold fs-4 pt-1 mb-3 pb-3">Wanna see Original:<br>      
      <a
      href="${response.data.url}"
      class="originalUrl fw-medium fs-6"
      >${response.data.url}</a> </p>
        `
})

for (let i = 0; i < 6; i++) {
    let Id = Math.floor((Math.random() * 249 + 1));
    let url = "https://api.tvmaze.com/shows/" + Id;
    axios.get(url).then((post) => {
      const countryName = post.data.network && post.data.network.country && post.data.network.country.name ? post.data.network.country.name : 'N/A';
      const language = post.data.language || 'N/A';
    cardCaruosel.innerHTML += `
    <div
    class="card col-3 bg-dark bg-opacity-75 m-3 mx-4 px-2"
    style="width: 19rem"
  >
    <a href="series.html?${post.data.id}" class="filmImg text-decoration-none">
      <img
        src="${post.data.image.original}"
        class="filmImg card-img-top"
        alt="${post.data.name}"
      />
      <span
        class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb ipc-rating-star-group--imdb text-warning "
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
          ></path></svg>${post.data.rating.average}/10</span>
      <p class="card-title fs-4 fw-bold text-light">${post.data.name}</p>
      <p class="card-text text-light my-1 fw-medium pb-2">${post.data.premiered}, ${countryName}, ${language}</p>
      </a>
  </div>`
});
};
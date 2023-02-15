/*- Visualização de filmes (\*)
- Paginação de filmes (\*)
- Busca de filmes (\*)
- "Filme do dia" (\*)
- Modal de filme (\*)
- Mudança de tema */

// Geral
const highlight__video = document.querySelector('.highlight__video');
const highlight__title = document.querySelector('.highlight__title');
const highlight__rating = document.querySelector('.highlight__rating');
const highlight__genres = document.querySelector('.highlight__genres');
const highlight__launch = document.querySelector('.highlight__launch');
const highlight__description = document.querySelector('.highlight__description');
// movies
const movie__title = document.querySelector('.movie__title');
const movie__rating = document.querySelector('.movie__rating');
//Videos
const highlight__video_link = document.querySelector('.highlight__video-link');
const card_movies = document.querySelector('.movies');

const modal__close = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
// Preenchimento
const modal__title = document.querySelector('.modal__title');
const modal__img = document.querySelector('.modal__img');
const modal__description = document.querySelector('.modal__description');
const modal__average = document.querySelector('.modal__average');
const modal__genre = document.querySelector('.modal__genre');
const modal__genres = document.querySelector('.modal__genres');
// Mudança de tema
const btn_theme = document.querySelector('btn-theme');

async function funcao(inicio, fim) {

    try {

        const response = await api.get('/discover/movie?language=pt-BR&include_adult=false');

        let movies = response.data.results;

        card_movies.innerHTML = "";

        for (let i = inicio; i <= fim; i += 1) {

            const movie = document.createElement("div");
            const movies__info = document.createElement("div");
            const movies__title = document.createElement("span");
            const movies__rating = document.createElement("span");
            const image = document.createElement("img");
            image.src = './assets/estrela.svg'

            movie.classList.add('movie');
            movie.style.backgroundImage = `url('${movies[i].poster_path}')`;

            movies__title.classList.add('movie__title');
            movies__title.textContent += movies[i].title;
            movies__info.appendChild(movies__title);

            movies__info.classList.add('movie__info');
            movie.appendChild(movies__info);

            movies__info.appendChild(image);
            movies__info.appendChild(movies__rating);
            card_movies.appendChild(movie);


            movie.addEventListener('click', async (event) => {
                event.stopPropagation();
                const modal_response = await api.get(`/movie/${movies[i].id}language=pt-BR`);
                const modal_datas = modal_response.data;
                console.log(modal_datas);

                modal__title.textContent = modal_datas.title;
                modal__img.src = modal_datas.backdrop_path;
                modal__description.textContent = modal_datas.overview;
                modal__average.textContent = modal_datas.vote_average;

                modal.classList.remove('hidden');

            })

        }

    } catch (error) {

    }
}

async function movie_day() {

    const day_movie_video = await api.get("/movie/436969/videos?language=pt-BR");
    const day_movie = await api.get("/movie/436969?language=pt-BR");

    let cardMovieDay = day_movie.data;
    let cardMovieDayVideo = day_movie_video.data.results;

    highlight__video_link.href = `https://www.youtube.com/watch?v=${cardMovieDayVideo[1].key}`;
    console.log(cardMovieDayVideo);

    highlight__video.style.backgroundImage = `url('${cardMovieDay.backdrop_path}')`
    highlight__rating.textContent = cardMovieDay.vote_average.toFixed(1);
    highlight__title.textContent = cardMovieDay.title;

    highlight__genres.textContent = `${cardMovieDay.genres[0].name} 
    ${cardMovieDay.genres[1].name} ${cardMovieDay.genres[2].name} /`;

    highlight__launch.textContent = new Date(cardMovieDay.release_date).
        toLocaleDateString("pt-BR", {
            year: "numeric", month: "long",
            day: "numeric",
            timeZone: "UTC",
        });

    highlight__description.textContent = cardMovieDay.overview;

}

funcao(0, 5);

const right_arrow = document.querySelector('.btn-next');

let now_page = 0;

right_arrow.addEventListener('click', () => {

    if (now_page === 0) {
        now_page = 1;
        funcao(6, 11);

    } else if (now_page === 1) {
        now_page = 2;
        funcao(12, 17);

    } else {
        now_page = 0;
        funcao(0, 5);

    }
})

const left_arrow = document.querySelector('.btn-prev');

left_arrow.addEventListener('click', () => {

    if (now_page === 0) {
        now_page = 2;
        funcao(12, 17);

    } else if (now_page === 2) {
        now_page = 1;
        funcao(6, 11);

    } else {
        now_page = 0;
        funcao(0, 5);

    }
})

movie_day();

modal.addEventListener('click', (event) => {
    event.stopPropagation();

    modal.classList.add('hidden');

})

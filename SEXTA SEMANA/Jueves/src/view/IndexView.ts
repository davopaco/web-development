import { MovieInterface } from "../model/types/MovieInterface";
import { MovieInterfaceID } from "../model/types/MovieByIDInterface";

export default class IndexView {
  //Establece las variables de la clase por Div y Body.
  private readonly sec: HTMLDivElement;
  private readonly body: HTMLBodyElement;

  constructor() {
    //Asigna a las variables de la clase los elementos del DOM.
    this.sec = document.querySelector("#sec") as HTMLDivElement;
    this.body = document.body as HTMLBodyElement;
  }

  //Función para desplegar las películas en el index.
  public async deploy(moviesPromise: Promise<MovieInterface[]>): Promise<void> {
    //Espera a que se resuelva la promesa de las películas.
    return await moviesPromise
      .then((movies) => {
        //Recorre el array de películas y despliega cada una de ellas.
        movies.forEach((movie) => {
          //Añade al elemento sec, el artículo de cada película.
          this.sec.innerHTML += this.getArticle(movie);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public async deployTrailer(
    movieByIDPromise: Promise<MovieInterfaceID>
  ): Promise<void> {
    //Espera a que se resuelva la promesa de la película por ID.
    return await movieByIDPromise
      .then((movieByID) => {
        //Añade al elemento body, el artículo del trailer de la película.
        this.body.innerHTML += this.getArticleTrailer(movieByID);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Función para remover el trailer de la película.
  public removeTrailer(): void {
    //Selecciona el overlay y el movie-trailer del HTML.
    const overlay = document.getElementById("overlay");
    const movieTrailer = document.getElementById("movie-trailer");
    //Si existe el overlay, lo remueve.
    if (overlay) {
      overlay.remove();
    }
    //Si existe el movie-trailer, lo remueve.
    if (movieTrailer) {
      movieTrailer.remove();
    }
  }

  //Función para obtener el pedazo de documento HTML que representa a cada película.
  getArticle = (movie: MovieInterface): string => {
    //Retorna el pedazo de documento HTML que representa a cada película.
    return `<div class="movie-cell">
        <a id="${movie.rank}")><img src="${movie.image}" alt="${
      movie.title
    }"></a>
        <div class="text">
          <h3 class="searchh">${movie.rank}. ${movie.title}</h3>
          <p>${movie.year}&emsp;${
      movie.genre != null ? movie.genre[0] : " "
    }</p>
          <p>⭐️&emsp;${movie.rating}</p>
        </div>
        <div class="description">
          <p class="searchh">${movie.description}</p>
        </div>
      </div>`;
  };

  public searchBar(parameter: string, input: HTMLInputElement) {
    const cards = document.querySelectorAll(
      ".movie-cell"
    ) as unknown as HTMLDivElement[];
    cards.forEach((card) => {
      const h3 = card.getElementsByClassName(parameter);
      let foundMatch = false;
      for (const element of h3) {
        const txtValue =
          (element as HTMLElement).innerText ?? element.textContent;
        if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
          foundMatch = true;
          break;
        }
      }
      if (foundMatch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  public buttonClicked(btn: HTMLAnchorElement, input: HTMLInputElement) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.searchBar("searchh", input);
    });
  }

  //Función para obtener el pedazo de documento HTML que representa el trailer de la película.
  getArticleTrailer = (movieByID: MovieInterfaceID): string => {
    return `<div class="overlay" id="overlay"></div>
    <div class="movie-trailer" id="movie-trailer">
      <div class="video">
      <a>X&nbsp;Close</a>
        <iframe src="${movieByID.trailer_embed_link}?autoplay=1">
        </iframe>
      </div>
      <div class="movie-info">
        <div class="title">
          <img src="${movieByID.image}" alt="${movieByID.title}">
          <div class="classification">
            <h2>Movie Title</h2>
            <p>${movieByID.rank}&nbsp;|&nbsp;${
      movieByID.genre != null ? movieByID.genre[0] : " "
    }</p>
          </div>
        </div>
        <div class="movie-desc">
          <h1>Official Trailer</h1>
          <p>${movieByID.description}</p>
        </div>
      </div>
    </div>`;
  };
}

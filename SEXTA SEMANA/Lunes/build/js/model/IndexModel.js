var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexModel {
    constructor() {
        console.log("IndexModel");
    }
    // Método que retorna una promesa con un array de objetos de tipo TitleResultsResult
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                // Petición a la API de IMDB
                const response = fetch("https://imdb146.p.rapidapi.com/v1/find/?query=starwars", {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "b788cc0a90mshb82dc764acf1b06p12481djsn2e181b7b63f2",
                        "X-RapidAPI-Host": "imdb146.p.rapidapi.com",
                    },
                });
                // Resolución de la promesa
                response
                    .then((data) => {
                    // Se crea un objeto de tipo MovieStarwars con la respuesta de la API
                    data.json().then((movieStarwars) => {
                        // Se retorna el array de objetos de tipo TitleResultsResult
                        resolve(movieStarwars.titleResults.results);
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
}

import Express from "./express/Express";
import MovieFactory from "./movie/infrastructure/factory/MovieFactory";

const movieFactory = new MovieFactory();
const movieRouter = movieFactory.createRouter();
const app = new Express([movieRouter]);

app.start();

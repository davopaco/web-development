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
        this.articles = [];
        this.keywords = [];
        this.paperNumber = 10;
    }
    //Función para obtener la promesa de los papers.
    getPapers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((_resolve, reject) => {
                //Se hace un fetch a la dirección del servidor para obtener los papers.
                const response = fetch("/ref/references/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                response
                    .then((data) => {
                    //Se obtiene la respuesta en formato json y se resuelve la promesa con el array de papers.
                    data.json().then((data) => {
                        console.log(data);
                        _resolve(this.setData(data));
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    //Función para asignar los datos al modelo.
    setData(articles) {
        //Se itera sobre cada artículo para convertir los keywords en un array de strings que contengan las keywords.
        articles.forEach((article) => {
            if (typeof article._keywords === "string") {
                article._keywords = article._keywords.split(",");
            }
        });
        //Se asigna el array de artículos a la variable de la clase de articulos.
        this.articles.push(...articles);
        //Se asignan las keywords más buscadas.
        this.setMostSearchedKeywords(articles);
    }
    //Función para obtener el número de papers a mostrar por página.
    getPaperNumber() {
        return this.paperNumber;
    }
    //Función para obtener los artículos.
    getArticles() {
        return this.articles;
    }
    //Función para obtener las keywords más buscadas.
    getTopKeywords(number) {
        //Se ordenan las keywords de mayor a menor cantidad de veces que se repite su atributo de quantity.
        const topKeywords = this.keywords.sort((a, b) => b.quantity - a.quantity);
        //Se retorna un array de keywords con la cantidad especificada.
        return topKeywords.slice(0, number);
    }
    //Función para asignar un array de las keywords más buscadas.
    setMostSearchedKeywords(articles) {
        //Se itera sobre cada artículo para obtener las keywords.
        articles.forEach((article) => {
            const articleKeywords = Array.isArray(article._keywords)
                ? article._keywords
                : article._keywords.split(",");
            /*Se itera sobre cada keyword del artículo para asignar la cantidad de veces que se repite.
              Esto se hace basado en la interfaz de KeywordsQuantityInterface.*/
            articleKeywords.forEach((keyword) => {
                const index = this.keywords.findIndex((element) => element.keyword === keyword);
                //Si la keyword ya existe, se le suma 1 a la cantidad de veces que se repite.
                if (index > -1) {
                    this.keywords[index].quantity++;
                }
                else {
                    //Si la keyword no existe, se agrega al array de keywords con una cantidad de 1.
                    this.keywords.push({ keyword, quantity: 1 });
                }
            });
        });
    }
    //Función para obtener el objeto con las funcionalidades de búsqueda, del tipo searchingFunctionalitiesInterface.
    searchingFunctionalities() {
        return {
            //Función para buscar en los artículos para la searchbar.
            searchBar(input, articles) {
                //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
                let articlesArray = [];
                //Se itera sobre cada artículo.
                articles.forEach((article) => {
                    //Booleano para saber si se encontró una coincidencia.
                    let foundMatch = false;
                    //Objeto con los atributos del artículo que se van a buscar.
                    const toSearch = {
                        title: article._title,
                        authors: article._author,
                        abstract: article._abstract,
                        year: article._year,
                    };
                    //Se itera sobre los atributos del objeto toSearch para buscar coincidencias.
                    Object.keys(toSearch).forEach((key) => {
                        if (toSearch[key].toUpperCase().indexOf(input.toUpperCase()) > -1) {
                            foundMatch = true;
                        }
                    });
                    //Si se encontró una coincidencia, se agrega el artículo al array de artículos.
                    if (foundMatch) {
                        articlesArray.push(article);
                    }
                });
                //Se retorna el array de artículos filtrado.
                return articlesArray;
            },
            //Función para filtrar los artículos para el filtro de keywords.
            filterByKeyword(keywords, articles) {
                //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
                let articlesArray = [];
                //Si no hay keywords, se retorna el array de artículos.
                if (keywords.length === 0)
                    return articles;
                //Se itera sobre cada artículo.
                articles.forEach((article) => {
                    //Variable para saber cuántas coincidencias se encontraron.
                    let matchQuantity = 0;
                    //Se obtienen las keywords del artículo.
                    const articleKeywords = Array.isArray(article._keywords)
                        ? article._keywords
                        : [];
                    //Se itera sobre los keywords con las que se quiere filtrar.
                    keywords.forEach((keyword) => {
                        //Se itera sobre las keywords del artículo.
                        articleKeywords.forEach((articleKeyword) => {
                            if (keyword.toUpperCase() === articleKeyword.toUpperCase()) {
                                //Si se encontró una coincidencia, se suma 1 al contador de coincidencias y se rompe el ciclo.
                                matchQuantity++;
                                return;
                            }
                        });
                    });
                    //Si el contador de coincidencias es igual a la cantidad de keywords, se agrega el artículo al array de artículos.
                    if (matchQuantity === keywords.length) {
                        articlesArray.push(article);
                    }
                });
                //Se retorna el array de artículos filtrado.
                return articlesArray;
            },
        };
    }
}

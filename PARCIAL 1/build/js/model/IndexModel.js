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
        this.paperNumber = 10;
        this.input = document.querySelector("#search-bar");
        this.btn = document.querySelector("#search-btn");
        this.filter = document.querySelector("#inloc");
        this.radio = document.getElementsByName("radio");
    }
    //Función para obtener la promesa de los papers.
    getPapers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                //Se hace un fetch a la dirección del servidor para obtener los papers.
                const response = fetch("http://localhost:1802/ref/references/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                response
                    .then((data) => {
                    //Se obtiene la respuesta en formato json y se resuelve la promesa con el array de papers.
                    data.json().then((data) => {
                        resolve(data.papers);
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    //Función para obtener el input de la barra de búsqueda principal.
    getInput() {
        return this.input;
    }
    //Función para obtener el botón de búsqueda.
    getBtn() {
        return this.btn;
    }
    //Función para obtener el número de papers a mostrar por página.
    getPaperNumber() {
        return this.paperNumber;
    }
    //Función para obtener el input en texto de la barra de búsqueda del filtro.
    getFilter() {
        return this.filter;
    }
    //Función para obtener los inputs tipo radios de la barra de búsqueda del filtro.
    getRadio() {
        return this.radio;
    }
    //Función para obtener el objeto con las funcionalidades de búsqueda, del tipo searchingFunctionalitiesInterface.
    searchingFunctionalities() {
        //Se crea un parser para convertir el string de HTML a un objeto de tipo Document.
        const parser = new DOMParser();
        return {
            //Función para buscar en los artículos por el parámetro especificado.
            searchBar(parameter, input, articles) {
                //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
                let articlesArray = [];
                //Se itera sobre cada artículo.
                articles.forEach((article) => {
                    var _a;
                    //Se convierte el string de HTML a un objeto de tipo Document y se obtienen los elementos por el nombre de la clase.
                    const articleHTML = parser.parseFromString(article, "text/html");
                    const foundElements = articleHTML.getElementsByClassName(parameter);
                    //Booleano para saber si se encontró una coincidencia.
                    let foundMatch = false;
                    //Se itera sobre los elementos encontrados.
                    for (const element of foundElements) {
                        //Se obtiene el texto del elemento y se compara con el texto del input.
                        const txtValue = (_a = element.innerText) !== null && _a !== void 0 ? _a : element.textContent;
                        if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                            //Se cambia el booleano a true y se rompe el ciclo, para ir con el siguiente artículo.
                            foundMatch = true;
                            break;
                        }
                    }
                    //Si se encontró una coincidencia, se agrega el artículo al array de artículos.
                    if (foundMatch) {
                        articlesArray.push(article);
                    }
                });
                //Se retorna el array de artículos.
                return articlesArray;
            },
            //Función para filtrar los artículos por el parámetro especificado.
            filterByKeyword(articles, parameter, filter, radio) {
                const keywords = [];
                //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
                let articlesArray = [];
                //Se itera sobre los radios para hacer push al array de keywords, dependiendo del valor del label de los radios.
                radio.forEach((radio) => {
                    var _a, _b;
                    if (radio.checked) {
                        keywords.push((_a = radio.nextElementSibling.innerText) !== null && _a !== void 0 ? _a : (_b = radio.nextElementSibling) === null || _b === void 0 ? void 0 : _b.textContent);
                    }
                });
                //Se separan las palabras por comas y se agregan al array de keywords.
                filter.value.split(", ").forEach((keyword) => {
                    if (keyword !== "")
                        keywords.push(keyword);
                });
                //Si no hay keywords, se retorna el array de artículos.
                if (keywords.length === 0)
                    return articles;
                //Se itera sobre cada artículo.
                articles.forEach((article) => {
                    //Se convierte el string de HTML a un objeto de tipo Document y se obtienen los elementos por el nombre de la clase.
                    const articleHTML = parser.parseFromString(article, "text/html");
                    const foundElements = articleHTML.getElementsByClassName(parameter);
                    //Variable para saber cuántas coincidencias se encontraron.
                    let matchQuantity = 0;
                    //Se itera sobre los keywords.
                    keywords.forEach((label) => {
                        var _a;
                        //Se itera sobre los elementos encontrados.
                        for (const element of foundElements) {
                            //Se obtiene el texto del elemento y se compara con el texto del input.
                            const txtValue = (_a = element.innerText) !== null && _a !== void 0 ? _a : element.textContent;
                            if (txtValue.toUpperCase().indexOf(label.toUpperCase()) > -1) {
                                //Si se encontró una coincidencia, se suma 1 al contador de coincidencias y se rompe el ciclo.
                                matchQuantity++;
                                break;
                            }
                        }
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

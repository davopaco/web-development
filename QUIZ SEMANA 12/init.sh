app=products
port=1802
host=localhost
App=${app^}
mkdir src src/view src/model src/template src/public src/router src/config src/express env build src/model/types src/docs

## tutorial
echo "
Primero, verificamos que haya git

despues, ejecutamos el init.sh.

luego, nos traemos el template.  Para el template usamos .ejs
el css va en la carpeta public.

posterior a esto, realizamos movietemplate, que es el html de cada pelicula.

Ahora, realizaremos MovieModel, ya que de ahi viene toda la logica de negocio.
En este caso, MovieModel tiene el metodo de getMovies, el cual extrae las peliculas de una API externa.

Necesitamos la interface para poder consumir de la API. En el método prometemos la API 

Ahora realizamos Movie View. En MovieView renderizamos la vista de las peliculas, y la vista de error

Se modifica IndexTemplate.ejs para que reciba las peliculas y las renderice 

se crea express.ts, en donde se especifica la ruta publica, y se llaman a las variables de entorno.

Se instancia el objeto de express en movie.ts, el cual instancia el router, y este instancia la vista y esta instancia el modelo

o sea, se ve asi: new MoviesRouter(new MovieView(new MovieModel()))


 cd movies\ 1/ PARA MOVERSE CON ESPACIOS
" > ./src/docs/tutorial.txt

## source
echo "
import ${App}Express from './express/express';
import ${App}Model from './model/${App}Model';
import ${App}Router from './router/${App}Router';
import ${App}View from './view/${App}View';

const server = new ${App}Express(
  new ${App}Router(new ${App}View(new ${App}Model())),
  new ErrorRouter(new ErrorView())
);

server.start();
" > ./src/${app}.ts
## view
echo "
import { Request, Response } from 'express'
import ${App}Model from '../model/${App}Model'

export default class ${App}View {
  constructor (private readonly ${app}Model: ${App}Model) { }

  index = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Hello ${App}s' })
  }
    
}
" > ./src/view/${App}View.ts

## interface
echo "
export interface ${App}Interface {
  message: string;
}
" > ./src/model/types/${App}Interface.ts

## model
echo "
import { ${App}Interface } from './types/${App}Interface';
import data from '../data.json';

export default class ${App}Model {
  constructor () { }

  findAll = async (): Promise<${App}Interface[]> => {
    return await new Promise((resolve, reject) => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error('No data found'));
      }
    });
}
" > ./src/model/${App}Model.ts
## router
echo "
import { Router } from 'express'
import ${App}View from '../view/${App}View'

export default class ${App}sRouter {
  router: Router

  constructor (private readonly ${app}View: ${App}View) {
    this.router = Router()
    this.routes()
  }

  routes = (): void => {
    this.router.get('/', this.${app}View.index.bind(this.${app}View))
  }
}
" > ./src/router/${App}Router.ts
touch ./src/template/${App}Template.ejs

## error view
echo "
import { Request, Response } from 'express';

export default class ErrorView {
  index = async (_req: Request, res: Response): Promise<void> => {
    res.render('ErrorTemplate', {
      message: 'Endpoint not found',
    });
  };
}
" > ./src/view/ErrorView.ts

## error router
echo "
import { Router } from 'express';
import ErrorView from '../view/ErrorView';

export default class ErrorRouter {

  router: Router;

  constructor(private readonly errorView: ErrorView) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get('/', this.errorView.index.bind(this.errorView));
  };
}
" > ./src/router/ErrorRouter.ts

## express
echo "
import express, { Application } from 'express';
import ${App}Config from '../config/${App}Config';
import ${App}Router from '../router/${App}Router';
import ErrorRouter from '../router/ErrorRouter';
import path from 'path';
import morgan from 'morgan';

export default class ${App}Express {

  private readonly app: Application;

  constructor(
    private readonly ${app}Router: ${App}Router, private readonly errorRouter: ErrorRouter
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  config = (): void => {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../template'));
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(morgan('tiny'));
  };

  routes = (): void => {
    this.app.use('/', this.${app}Router.router);
    this.app.use('*', this.errorRouter.router);
  };

  start = (): void => {
    const PORT = ${App}Config.PORT;
    const HOST = ${App}Config.HOST;
    this.app.listen(PORT, () => {
      console.log(\`Server is running on \${HOST}:\${PORT}\`);
    });
  };
}
" > ./src/express/express.ts

## error template
echo "
<!DOCTYPE html>
<html lang='en'>

<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Error</title>
</head>

<body>
  <h1>Not Found</h1>
  <p><%= message %></p>
</body>

</html>
" > ./src/template/ErrorTemplate.ejs

## config
echo "
export default {
  HOST: process.env.HOST ?? 'localhost',
  PORT: process.env.PORT ?? 1802
}
" > ./src/config/${App}Config.ts

## parameters
echo '# '${App} > README.md
echo "/node_modules" >> .gitignore
echo "/build" >> .gitignore
HOST='HOST='$host
PORT='PORT='$port
echo $HOST > ./env/.development.env
echo $PORT >> ./env/.development.env
cp ./env/.development.env ./env/.production.env

## init package.json
echo  '
{
  "name": "'$app'",
  "version": "1.0.0",
  "description": "'$App'",
  "main": "./build/'$app'.js",
  "scripts": {
    "dev": "ts-node-dev --env-file=env/.development.env src/'$app'.ts",    
    "build": "rm -rf ./build && tsc",
    "lint": "ts-standard --fix",
    "copy-files": "copyfiles -u 1 src/**/*.ejs src/**/*.css build/src/",
    "start": "node --env-file=env/.production.env src/build/'$app'.js",
    "test": "jest --verbose"
  },
  "keywords": ["'$app'"],
  "author": "",
  "license": "ISC",  
  "eslintConfig": {
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "extends": "./node_modules/ts-standard/eslintrc.json",
    "env": {
      "jest": true
    }
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "roots": [
      "<rootDir>/test"
    ],
    "testMatch": [
      "**/test/**/*.test.ts"
    ]
  }
}
' > package.json
## install dependencies
npm i express cors morgan ejs fs axios path
## install development dependencies
npm i typescript ts-node-dev ts-standard jest ts-jest @types/express @types/cors @types/morgan @types/ejs @types/jest @types/node -D
## install some other development dependencies
npm install --save-dev copyfiles

## init tsconfig.json

echo '
{
  "compilerOptions": {

    /* Language and Environment */
    "target": "ES2022",
    "lib": ["dom", "ES2022"],

    /* Modules */
    "module": "node16",                          
    "rootDir": "./",
    "moduleResolution": "node16",
    "types": ["jest", "node"],
    "resolveJsonModule": true,

    /* Emit */
    "sourceMap": true,
    "outDir": "./build",

    /* Interop Constraints */
    "esModuleInterop": true,                          
    "forceConsistentCasingInFileNames": true,

    /* Type Checking */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Completeness */
    "skipLibCheck": true
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules", "config", "docs", "logs", "build"]
}
' > tsconfig.json

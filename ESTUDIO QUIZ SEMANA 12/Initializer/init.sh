app=quiz
port=1802
host=localhost
App=${app^}
mkdir src src/view src/model src/template src/public src/router src/config src/express env build src/model/types
## source
echo "
import ${App}Express from './express/express';
import ${App}Model from './model/${App}Model';
import ${App}Router from './router/${App}Router';
import ${App}View from './view/${App}View';

const server = new ${App}Express(
  new ${App}Router(new ${App}View(new ${App}Model()))
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

## express
echo "
import express, { Application } from 'express';
import ${App}Config from '../config/${App}Config';
import ${App}Router from '../router/${App}Router';
import path from 'path';
import morgan from 'morgan';

export default class ${App}Express {

  private readonly app: Application;

  constructor(
    private readonly ${app}Router: ${App}Router
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
npm i typescript ts-node-dev ts-standard jest ts-jest @types/express @types/cors @types/morgan @types/ejs @types/jest @types/axios @types/node -D
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

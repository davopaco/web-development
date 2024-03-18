npm init -y
npm install express
npm install typescript ts-node-dev ts-node nodemon @types/node @types/express ts-standard -D
tsc --init

mkdir -p src docs build test config
touch src/papers.ts
touch .gitignore
touch ./config/.development.env
echo "node_modules" >> .gitignore
echo "PORT=6012" >> ./config/.development.env
echo "HOST=localhost" >> ./config/.development.env

mkdir -p src/controller src/model src/view
touch src/controller/PapersController.ts
touch src/model/PapersModel.ts
touch src/view/PapersView.ts
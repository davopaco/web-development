//Exporta un objeto default con las variables de entorno.
export default {
  HOST: process.env.HOST ?? "localhost",
  PORT: process.env.PORT ?? 1802,
};

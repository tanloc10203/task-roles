console.log("process.env.PORT: ", process.env.PORT);

export default {
  port: process.env.PORT || 8888,
  logLevel: "info",
};

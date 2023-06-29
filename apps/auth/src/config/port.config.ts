export default () => {
  const port = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 80;
  if (isNaN(port) || port < 0) throw new Error("Incorrect port format in configurations");
  return { port };
};
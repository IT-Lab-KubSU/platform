import { readFileSync } from "fs";
import { join } from "path";

export default () => {
  if (process.env.PRIVATE_KEY_PATH === undefined) throw new Error("Incorrect PRIVATE_KEY_PATH format in configurations");
  if (process.env.PUBLIC_KEY_PATH === undefined) throw new Error("Incorrect PUBLIC_KEY_PATH format in configurations");
  const private_key = readFileSync(join("./", process.env.PRIVATE_KEY_PATH), "utf8");
  const public_key = readFileSync(join("./", process.env.PUBLIC_KEY_PATH), "utf8");
  return { private_key, public_key };
};
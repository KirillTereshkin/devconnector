import { resolve } from "path";
import moduleAlias from "module-alias";

export const registerAliases = () => {
  moduleAlias.addAliases({
    "@api": resolve(__dirname, "api"),
    "@config": resolve(__dirname, "config"),
    "@helpers": resolve(__dirname, "helpers"),
    "@loaders": resolve(__dirname, "loaders"),
    "@model": resolve(__dirname, "model"),
    "@services": resolve(__dirname, "services"),
  });

  moduleAlias();
};

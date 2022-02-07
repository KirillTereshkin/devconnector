import { createContext, useContext } from "react";
import RootStore, { IRootStore } from "../store/rootStore";

export const createStore = () => RootStore.create();

export const RootStoreContext = createContext<null | IRootStore>(null);

export const useStore = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error("Store has to be initialized");
  }

  return store;
};

export const useSelector = <T>(selector: (store: IRootStore) => T) =>
  selector(useStore());

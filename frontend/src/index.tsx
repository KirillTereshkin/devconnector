import React, { FC } from "react";
import ReactDOM from "react-dom";
import { createStore, RootStoreContext } from "./services/helpers/storeProvider";

const rootStore = createStore();

const App: FC = () => <RootStoreContext.Provider value={rootStore} />;

ReactDOM.render(<App />, document.getElementById("app"));

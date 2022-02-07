import { Instance, types } from "mobx-state-tree";

const RootStore = types
  .model("RootStore", {
    timer: 0,
  })
  .views((self) => ({
    get getTimer() {
      return self.timer;
    },
  }))
  .actions((self) => ({
    startTimer() {
      self.timer++;
    },
  }));

export interface IRootStore extends Instance<typeof RootStore> {}

export default RootStore;

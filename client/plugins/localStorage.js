import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  //storing the state to local and when NuxtApp is ready, we can retrieve data from local
  window.onNuxtReady(() => {
    createPersistedState({})(store);
  });
};

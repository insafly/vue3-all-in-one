import { createStore } from 'vuex';
import postModile from './postModile';

export default createStore({
  modules: {
    post: postModile,
  },
});
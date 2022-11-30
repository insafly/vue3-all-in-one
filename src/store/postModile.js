import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    isPostsLoading: false,
    page: 1,
    limit: 10,
    totalPages: 0,
    selectedSort: '',
    sortOptions: [
      { value: 'title', name: 'Sort by title' },
      { value: 'body', name: 'Sort by body' },
    ],
    searchQuery: '',
  }),
  getters: {
    sortedPosts(state) {
      // without mutation of base post array
      return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().trim().includes(state.searchQuery.toLowerCase().trim()));
    },
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setLoading(state, payload) {
      state.isPostsLoading = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setTotalPages(state, payload) {
      state.isPostsTotalPages = payload;
    },
    setSelectedSort(state, payload) {
      state.selectedSort = payload;
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload;
      console.log(payload, state.searchQuery)
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true); 
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data); 
      } catch (e) {
        console.error(e);
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [ ...state.posts, ...response.data ]);
      } catch (e) {
        console.error(e);
      }
    },
  },
};

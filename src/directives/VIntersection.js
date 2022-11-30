export default {
  name: 'Intersection',
  mounted(el, binding) {
    const { loadMorePosts, page, totalPages } = binding.value;

    const opts = {
      rootMargin: '0px',
      threshold: 1.0
    };

    const callback = (entries, observer) => {
      // if (entries[0].isIntersecting && page <= totalPages) {
      if (entries[0].isIntersecting) {
        loadMorePosts();
      }
    };

    const observer = new IntersectionObserver(callback, opts);
    observer.observe(el)
  },
}

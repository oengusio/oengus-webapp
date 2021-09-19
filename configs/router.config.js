// Router configuration: https://nuxtjs.org/docs/directory-structure/nuxt-config#router

export function routerConfig() {
  return {
    linkExactActiveClass: 'is-active',
    middleware: 'oengus-v1-redirect',
  };
}

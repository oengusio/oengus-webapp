// Router configuration: https://nuxtjs.org/docs/directory-structure/nuxt-config#router
import { sortRoutes } from '@nuxt/utils';

export function routerConfig() {
  return {
    extendRoutes(routes) {
      routes.push({
        // Handles old user profiles by pushing them to the new user profiles!
        path: '/:locale?/user/profile/:user',
        redirect: to => ({
          path: '/:locale?/user/:user',
          params: to.params,
        }),
      });
      sortRoutes(routes);
    },
    middleware: 'oengus-v1-redirect',
  };
}

// Markdown configuration: https://github.com/nuxt-community/markdownit-module

export function markdownItConfig() {
  return {
    preset: 'default',
    html: true,
    breaks: true,
    linkify: true,
  };
}

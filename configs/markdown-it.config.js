// Markdown configuration: https://github.com/nuxt-community/markdownit-module

export function markdownItConfig() {
  return {
    preset: 'commonmark',
    html: false,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  };
}

// Markdown configuration: https://github.com/nuxt-community/markdownit-module

export function markdownItConfig() {
  return {
    preset: 'default',
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    use: [
      'markdown-it-dompurify',
    ],
  };
}

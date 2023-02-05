export function parseMastodonUrl(input: string): string {
  const [username, platform] = input.split('@');

  return `https://${platform}/@${username}`;
}

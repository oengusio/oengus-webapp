const mastodonRegex = /@?([^@]+)(?:@(.*))?/;

export function parseMastodonUrl(input: string): string {
  const match = mastodonRegex.exec(input);

  if (match == null) {
    return '';
  }

  const [_, username, platform] = match;

  return `https://${platform || 'mastodon.social'}/@${username}`;
}

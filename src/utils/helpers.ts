const mastodonRegex = /@?([^@]+)(?:@(.*))?/;

export function parseMastodonUrl(input: string): string {
  const match = mastodonRegex.exec(input);

  if (match == null) {
    return '';
  }

  const [_, username, platform] = match;

  return `https://${platform || 'mastodon.social'}/@${username}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = blobUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}

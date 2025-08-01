import { LineRunner } from '../model/schedule-line';

// Possibly better regex: ^@?\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b$
const mastodonRegex = /@?([^@]+)(?:@(.*))?/;

export function parseMastodonUrl(input: string): string {
  const match = mastodonRegex.exec(input);

  if (match == null) {
    return '';
  }

  const [_, username, platform] = match;
  const safePlatform = platform || 'mastodon.social';
  let usernameUrlPart = `@${username}`;

  // Their urls are not compatible with mastodon so we have to check and strip the @ part
  if (safePlatform === 'bsky.brid.gy') {
    usernameUrlPart = username;
  }

  return `https://${safePlatform}/${usernameUrlPart}`;
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

export function getRunnerUsername(runner: LineRunner): string {
  if (runner.profile) {
    return runner.profile.username;
  }

  return runner.runnerName;
}

export function getRunnerDisplayName(runner: LineRunner): string {
  if (runner.profile) {
    return `${runner.profile.displayName} (${runner.profile.username})`;
  }

  return runner.runnerName;
}

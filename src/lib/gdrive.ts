export const transformGoogleDriveUrl = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'https:') return null;
    if (parsedUrl.hostname !== 'drive.google.com') return null;

    const regex = /^\/d\/([^/]+)\/view$/;
    const match = parsedUrl.pathname.match(regex);

    if (!match || !match[1]) return null;
    if (parsedUrl.search || parsedUrl.hash) return null;

    const id = match[1];
    return `https://lh3.googleusercontent.com/d/${id}`;
  } catch (e) {
    return null;
  }
};

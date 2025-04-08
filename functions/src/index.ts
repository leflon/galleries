import {onCall} from 'firebase-functions/v2/https';

export const checkImage = onCall(async (request) => {
  const url = request.data.url;
  if (!url) {
    return {valid: false, error: 'URL is required'};
  }
  try {
    new URL(url);
  } catch (e) {
    return {valid: false, error: 'Invalid URL'};
  }

  const res = await fetch(url, {method: 'HEAD'});
  if (!res.ok) {
    return {valid: false, error: 'Invalid URL'};
  }
  const contentType = res.headers.get('content-type');
  const contentLength = res.headers.get('content-length');
  if (!contentType || !contentLength) {
    return {valid: false, error: 'Invalid URL'};
  }

  const isImage = contentType.startsWith('image/');
  return {valid: isImage};
});

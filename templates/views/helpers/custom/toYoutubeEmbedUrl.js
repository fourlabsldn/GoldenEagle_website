const path = require('path');
const embedUrlPrefix = 'https://www.youtube.com/embed';
const videoIdRegex = /\?.*v=(\w+)/;

// isGetParameterList :: String -> Boolean
const isGetParameterList = str => str.includes('?');

// getVideoIdParam :: String -> String
const getVideoIdParam = str => (videoIdRegex.exec(str) || [])[1];
/**
 * @param  {String} videoUrl - Video's youtube URL
 * @return {String}
 */
module.exports = function toYoutubeEmbedUrl(videoUrl) {
  const endOfUrl = path.parse(videoUrl).name;
  const videoId = isGetParameterList(endOfUrl)
    ? getVideoIdParam(endOfUrl) // May return undefined
    : endOfUrl;

  return videoId ? path.join(embedUrlPrefix, videoId) : '';
};

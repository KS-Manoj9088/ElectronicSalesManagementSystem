/**
 * Add cache-busting parameter to image URL to force browser to reload updated images
 * @param {string} url - The image URL
 * @returns {string} - URL with cache-busting parameter
 */
export const getImageUrl = (url) => {
  if (!url) return '';
  
  // If URL already has query parameters, append with &, otherwise use ?
  const separator = url.includes('?') ? '&' : '?';
  
  // Add timestamp to force reload (updates every minute to balance freshness and caching)
  // This ensures images are refreshed when updated, but still allows some caching
  // Using minutes instead of hours for more immediate updates
  const cacheBuster = Math.floor(Date.now() / (1000 * 60)); // Changes every minute
  
  return `${url}${separator}v=${cacheBuster}`;
};

/**
 * Get the first image URL from a product's images array with cache-busting
 * @param {Array} images - Array of image objects with url property
 * @returns {string} - Cache-busted image URL or empty string
 */
export const getProductImageUrl = (images) => {
  if (!images || images.length === 0) return '';
  return getImageUrl(images[0].url);
};


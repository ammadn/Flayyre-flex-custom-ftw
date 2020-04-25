/*
 * Marketplace specific configuration.
 */



export const categories = [
  { key: 'Fashion', label: 'Fashion' },
  { key: 'Fitness', label: 'Fitness' },
  { key: 'Beauty', label: 'Beauty' },
  { key: 'Gaming', label: 'Gaming' },
  { key: 'Lifestyle', label: 'Lifestyle' },
  { key: 'Business', label: 'Business' },
  { key: 'Media', label: 'Entertainment' },
  { key: 'Food', label: 'Food' },
  { key: 'Travel', label: 'Travel' },
  { key: 'other', label: 'Other' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

export const followersFilterConfig={
  min:0,
  max:1000000000000000000000000,
}
// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};

export const testConfig = {
  /** Default timeout for actions (ms) */
  defaultTimeout: 30000,
  /** Default timeout for navigation (ms) */
  navigationTimeout: 60000,
  /** Default timeout for expect assertions (ms) */
  expectTimeout: 10000,
  /** Viewport sizes */
  viewport: {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 812 },
  },
  /** API default headers */
  apiHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

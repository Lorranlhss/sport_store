export const environment = {
  production: true,
  apiUrl: 'https://api.sportsstore.com',
  appName: 'Sports Store',
  appVersion: '1.0.0',
  cacheEnabled: true,
  cacheTTL: 10 * 60 * 1000, // 10 minutes
  pageSize: 20,
  maxPageSize: 100,
  features: {
    authentication: true,
    cart: true,
    checkout: true,
    wishlist: true,
    reviews: true
  }
};

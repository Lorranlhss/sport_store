export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  appName: 'Sports Store',
  appVersion: '1.0.0',
  cacheEnabled: true,
  cacheTTL: 5 * 60 * 1000, // 5 minutes
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

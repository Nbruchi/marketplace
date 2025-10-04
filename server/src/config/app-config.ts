import { registerAs } from "@nestjs/config";

export default registerAs("app", () => {
  const defaultDomain = "marketplace.com";
  const defaultAppUrl = `https://${defaultDomain}`;

  return {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    apiPrefix: process.env.API_PREFIX,
    name: process.env.APP_NAME || "Marketplace",
    url: process.env.APP_URL || defaultAppUrl,
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
    },
    // Company/App Info
    companyAddress:
      process.env.COMPANY_ADDRESS || "123 Market Street, City, Country",
    supportEmail: process.env.SUPPORT_EMAIL || `support@${defaultDomain}`,
    supportUrl: process.env.SUPPORT_URL || `${defaultAppUrl}/support`,
    // Web App URLs
    webAppUrls: {
      login: process.env.LOGIN_URL || `${defaultAppUrl}/auth/login`,
      register: process.env.REGISTER_URL || `${defaultAppUrl}/auth/register`,
      dashboard: process.env.DASHBOARD_URL || `${defaultAppUrl}/dashboard`,
      account: process.env.ACCOUNT_URL || `${defaultAppUrl}/account`,
      store: process.env.STORE_URL || `${defaultAppUrl}/store`,
      resetPassword:
        process.env.RESET_PASSWORD_URL ||
        `${defaultAppUrl}/auth/reset-password`,
      verifyEmail:
        process.env.VERIFY_EMAIL_URL || `${defaultAppUrl}/auth/verify-email`,
    },
    // Social Media Links
    social: {
      facebook:
        process.env.SOCIAL_FACEBOOK_URL ||
        `https://facebook.com/${defaultDomain}`,
      twitter:
        process.env.SOCIAL_TWITTER_URL ||
        `https://twitter.com/${defaultDomain}`,
      instagram:
        process.env.SOCIAL_INSTAGRAM_URL ||
        `https://instagram.com/${defaultDomain}`,
    },
  };
});

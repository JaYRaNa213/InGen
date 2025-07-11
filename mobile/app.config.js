import 'dotenv/config';

export default {
  expo: {
    name: "InGen",
    slug: "ingen",
    version: "1.0.0",
    sdkVersion: "53.0.0",
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};

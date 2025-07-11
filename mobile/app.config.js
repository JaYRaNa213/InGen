import 'dotenv/config';

export default {
  expo: {
    name: 'InGen',
    slug: 'InGen',
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};

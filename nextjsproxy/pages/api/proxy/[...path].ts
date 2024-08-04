// pages/api/proxy/[...path].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: 'https://awashbank.com/exchange-historical/', // Replace with your target API
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // Remove `/api/proxy` prefix when forwarding
  },
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
};

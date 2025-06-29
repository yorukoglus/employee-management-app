/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
  // Handle client-side routing for SPA
  appIndex: 'index.html',
  historyApiFallback: true,
  // Open browser automatically
  open: true,
  // Add custom middleware for SPA routing
  middleware: [
    (context, next) => {
      // If the request is for a route that doesn't exist as a file,
      // serve index.html instead
      if (!context.url.includes('.') && context.url !== '/') {
        context.url = '/index.html';
      }
      return next();
    },
  ],
};

import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { create as createFedopsLogger } from '@wix/fedops-logger';
import App from './components/App';

const fedopsLogger = createFedopsLogger('tldr-client');

// Move the following `appLoaded()` call to the point where your app has fully loaded.
// See https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md
fedopsLogger.appLoaded();

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
  <Suspense fallback="...loading">
    <App />
  </Suspense>,
);

// To get normal classnames instead of CSS Modules classnames for testing
require('mock-css-modules');

const globalAny: any = global;

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;

require('babel-register');
require('babel-polyfill');

globalAny.document = require('jsdom').jsdom('<body></body>');
globalAny.window = document.defaultView;
globalAny.navigator = window.navigator;

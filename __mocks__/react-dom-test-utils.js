'use strict';

// Shim for react-dom/test-utils compatibility with React 19.
// React 19 removed React.act from the default export and moved it to named export.
// @testing-library/react still imports act from react-dom/test-utils, which internally
// tries to call React.act() - this shim bypasses that by providing act directly from react.
const { act } = require('react');

module.exports = { act };

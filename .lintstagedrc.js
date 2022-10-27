module.exports = {
  "**/*.(ts|js)?(x)": (filenames) => `npm run lint-files ${filenames.join(" ")}`, // Run ESLint on changes to JavaScript/TypeScript files.
};

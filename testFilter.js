module.exports = function filter(testPaths) {
  const filtered = testPaths
    .filter(
      (testPath) =>
        !testPath.toLowerCase().includes('repository') &&
        !testPath.toLowerCase().includes('syncissuesenqueuer') &&
        !testPath.toLowerCase().includes('databasecontroller') &&
        !testPath.toLowerCase().includes('datetime'),
    )
    .map((testPath) => ({ test: testPath }));
  return {
    filtered,
  };
};

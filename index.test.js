const parsePatch = require('./index');
const ghPrFiles = require('./ghPRFiles.json');

describe('parsePatch', () => {
  it('should parse patches', async () => {
    const parsed = ghPrFiles.map((file) => parsePatch(file.patch));
    expect(parsed).toEqual([
      [
        {
          modification: 'deleted',
          lineNumber: 15,
          line: '    "ci_flow": "ci_flow --no-systest --no-publish",',
        },
        {
          modification: 'added',
          lineNumber: 15,
          line: '    "ci_flow": "node ./test/getPullRequestLinesAdded.js",',
        },
        {
          modification: 'added',
          lineNumber: 36,
          line: '    "git-patch-additions": "^1.0.1",',
        },
        {
          modification: 'added',
          lineNumber: 46,
          line: '    "parse-diff": "^0.7.0",',
        },
        {
          modification: 'added',
          lineNumber: 56,
          line: '    "git-patch-parser": "^0.2.1",',
        },
        {
          modification: 'deleted',
          lineNumber: 59,
          line: '    "pino": "^5.12.0"',
        },
        {
          modification: 'added',
          lineNumber: 62,
          line: '    "pino": "^5.12.0",',
        },
        {
          modification: 'added',
          lineNumber: 63,
          line: '    "simple-git": "^1.132.0"',
        },
        {
          modification: 'deleted',
          lineNumber: 61,
          line: '}',
        },
        {
          modification: 'added',
          lineNumber: 66,
          line: '}',
        },
      ],
    ]);
  });
});

const fileLinesRegex = /^@@ -([0-9]*),?\S* \+([0-9]*),?/;

function splitIntoHunks(lines) {
  const hunks = [];

  let currentHunk;

  lines.forEach((line) => {
    if (line.startsWith('@@')) {
      const [, deletedStartLineNumber, addedStartLineNumber] = line.match(fileLinesRegex);
      currentHunk = {
        deletedStartLineNumber: parseInt(deletedStartLineNumber, 10),
        addedStartLineNumber: parseInt(addedStartLineNumber, 10),
        lines: [],
      };
      hunks.push(currentHunk);
    } else {
      currentHunk.lines.push(line);
    }
  });


  return hunks;
}

/**
 * @param {string} patch - the file patch to parse. taken from https://developer.github.com/v3/pulls/#list-pull-requests-files
 * @returns {GitPatch[]} Array of git patches
 */
module.exports = (patch) => {
  const lines = patch.split('\n');

  const gitPatches = [];

  splitIntoHunks(lines).forEach((hunk) => {
    let addedLineNumber = hunk.addedStartLineNumber;
    let deletedLineNumber = hunk.deletedStartLineNumber;

    hunk.lines.forEach((line) => {
      if (line.startsWith('+')) {
        gitPatches.push({
          modification: 'added',
          line: line.substr(1),
          lineNumber: addedLineNumber,
        });
        addedLineNumber += 1;
      } else if (line.startsWith('-')) {
        gitPatches.push({
          modification: 'deleted',
          line: line.substr(1),
          lineNumber: deletedLineNumber,
        });
        deletedLineNumber += 1;
      } else {
        addedLineNumber += 1;
        deletedLineNumber += 1;
      }
    });
  });

  return gitPatches;
};

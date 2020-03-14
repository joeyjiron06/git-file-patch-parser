declare namespace GitFilePatchParser {

  /**
     * The type of modification based on the patch info. Whether lines were added or deleted
     */
  enum GitLineMofification {
    ADDED = 'added',
    DELETED = 'deleted',
  }

  interface GitPatch {
    /**
     * The line number of the modification
     */
    modification: GitLineMofification;
    /**
     * The line number of the modification
     */
    lineNumber: number;
    /**
     * The contents of the line in question. It's the full string source code
     */
    line: string;
  }
}


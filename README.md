# git-file-patch-parser

Parse a file's patch which is returned from github's [pull request api](https://developer.github.com/v3/pulls/#list-pull-requests-files).


## Installation 

```bash
npm install git-file-patch-parser --save
```

## Usage 


```js
const parseFilePatch = require('git-file-patch-parser');

async function fn() {
  const reponse = octokit.pulls.listFiles(/* args here */);
  reponse.data.forEach(file => {
    console.log(file.filename, parseFilePatch(file.patch));
  });
}
```
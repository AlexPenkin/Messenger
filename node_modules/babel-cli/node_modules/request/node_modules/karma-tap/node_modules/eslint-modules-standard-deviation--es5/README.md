# eslint-modules-standard-deviation--es5

[![npm version](https://badge.fury.io/js/eslint-modules-standard-deviation--es5.svg)](https://badge.fury.io/js/eslint-modules-standard-deviation--es5)
[![npm downloads](https://img.shields.io/npm/dm/eslint-modules-standard-deviation--es5.svg?style=flat-square)](https://www.npmjs.com/package/eslint-modules-standard-deviation--es5)

> Add linter settings easily to any javascript `ES5` project using shared eslint config, [eslint-config-standard-deviation--es5](https://github.com/bySabi/eslint-config-standard-deviation--es5), and [ESLint](http://eslint.org/)

## Installation

### npm
```bash
npm install eslint eslint-modules-standard-deviation--es5 --save-dev
```

#### `Node 4` support
```bash
npm install eslint eslint-config-standard-deviation--es5 eslint-modules-standard-deviation--es5 --save-dev
```

## Usage
Add `extends` to project `.eslintrc`
```json
{
  "extends": ["standard-deviation--es5"]
}
```

### [optional] enable/disable [eslint rules](http://eslint.org/docs/rules/)
```json
{
  "extends": ["standard-deviation--es5"],
  "rules": {
    "space-before-function-paren": ["2", "always"]
  }
}
```

### Add scripts to `package.json`
```json
"scripts": {
  "lint": "eslint . --ext .js",
  "testonly": "echo \"Error: no test specified\" && exit 1",
  "test": "npm run lint && npm run testonly"
}
```

## Projects using `eslint-modules-standard-deviation--es5`
* [karma-tap](https://github.com/bySabi/karma-tap)
* [karma-tap-pretty-reporter](https://github.com/bySabi/karma-tap-pretty-reporter)
* [tap-lochnest](https://github.com/bySabi/tap-lochnest)
* [tapa](https://github.com/bySabi/tapa)

## Contributing

* Documentation improvement
* Feel free to send any PR

## License

[ISC][isc-license]

[isc-license]:./LICENSE

# v-img

[![Build Status](https://badgen.net/travis/FEMessage/v-img/master)](https://travis-ci.com/FEMessage/v-img)
[![NPM Download](https://badgen.net/npm/dm/@femessage/v-img)](https://www.npmjs.com/package/@femessage/v-img)
[![NPM Version](https://badgen.net/npm/v/@femessage/v-img)](https://www.npmjs.com/package/@femessage/v-img)
[![NPM License](https://badgen.net/npm/license/@femessage/v-img)](https://github.com/FEMessage/v-img/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/v-img/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

This component aims to replace native img element and use webp!

[中文文档](./README-zh.md)

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#Usage)
- [Links](#links)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Features

- Automatically check whether your browser support webp and use it
- Support multi-provider parameter configuration
  - [x] Alibaba
  - [x] Qiniu

[⬆ Back to Top](#table-of-contents)

## Install

```bash
yarn add @femessage/v-img
```

[⬆ Back to Top](#table-of-contents)

## Usage

```vue
<v-img :src="src" width="100" />
```

### provider

The component use `provider` to choose image processing strategy, here are available values:

- alibaba(default)
- qiniu
- self
- none

Alibaba OSS services are used by default, so if you host images on Alibaba OSS, `provider` can be omitted

When `provider=self`, means you host images on your server(like Nginx), this needs you need to prepare a webp file for each image, for example:

```sh
images/
  avatar.png # your original image file
  avatar.png.webp # webp file need to be generated
```

look at this [article](https://www.yuque.com/docs/share/3eaa556c-0780-4018-8ac1-4e217fb0efdb?translate=en) to see how to use node.js to generate webp from jpg/png

When `provider=none`, it only enable lazyload images function

### width/height

You'd better set image's width or height attribute(like 100, not 100px) to make sure lazyload function can work correctly

### lazyload

The `lazyload` function is supported by [lazysizes](https://github.com/aFarkas/lazysizes), and it is auto enabled.

[⬆ Back to Top](#table-of-contents)

## Links

- [docs](https://FEMessage.github.io/v-img/)
- [webp](https://developers.google.com/speed/webp)
- [alibaba oss guide](https://www.alibabacloud.com/help/doc-detail/47505.html?spm=a2c5t.11065259.1996646101.searchclickresult.2c802d29Uot0hD)
- [qiniu images processing doc](https://developer.qiniu.com/dora/api/1270/the-advanced-treatment-of-images-imagemogr2)

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=colmugx" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/commits?author=colmugx" title="Documentation">📖</a> <a href="https://github.com/FEMessage/v-img/commits?author=colmugx" title="Tests">⚠️</a> <a href="#translation-colmugx" title="Translation">🌍</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/commits?author=donaldshen" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/v-img/commits?author=donaldshen" title="Documentation">📖</a> <a href="#review-donaldshen" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/commits?author=evillt" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/v-img/commits?author=evillt" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt="Han"/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/issues?q=author%3Alianghx-319" title="Bug reports">🐛</a></td><td align="center"><a href="https://coldstone.fun"><img src="https://avatars1.githubusercontent.com/u/18013127?v=4" width="100px;" alt="Cold Stone"/><br /><sub><b>Cold Stone</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=xrr2016" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#projectManagement-levy9527" title="Project Management">📆</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)

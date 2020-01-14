# v-img

[![Build Status](https://badgen.net/travis/FEMessage/v-img/master)](https://travis-ci.com/FEMessage/v-img)
[![NPM Download](https://badgen.net/npm/dm/@femessage/v-img)](https://www.npmjs.com/package/@femessage/v-img)
[![NPM Version](https://badgen.net/npm/v/@femessage/v-img)](https://www.npmjs.com/package/@femessage/v-img)
[![NPM License](https://badgen.net/npm/license/@femessage/v-img)](https://github.com/FEMessage/v-img/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/v-img/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

取代原生 img 元素，使用 webp！

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#Usage)
- [Links](#links)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Features

- 输入 jpg/png，输出 webp（svg/gif 原样返回，不做转换处理）
- 根据浏览器环境自动选择是否使用 webp
- 支持云服务
  - [x] 阿里云
  - [x] 七牛

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

设置 `provider` 来使用不同的图片处理方案，`provider` 参数有以下选项：

- alibaba（默认）
- qiniu
- self
- none

---

- 默认值为 alibaba。这意味着，只需要上传 jpg/png 到阿里云 OSS，使用 v-img 来显示图片，则会使用阿里云的图片处理服务，根据情况自动返回 webp。如果项目中已使用阿里云 OSS 进行图片存储，则可省略设置`provider`

- 当 `provider=self` 时，也即图片放到自有主机，一般出现在项目私有化部署的情况，此时需为每一份图片自行准备相应的 webp 文件。 例如:

```sh
images/
  avatar.png # 原有图片
  avatar.png.webp # 需要生成的 webp 文件
```

生成 webp 副本的方法可查看[此文](https://www.yuque.com/docs/share/3eaa556c-0780-4018-8ac1-4e217fb0efdb)。

- 当`provider=none` 时，仅启用图片懒加载功能

总结一下就是：

1. 当 `provider=alibaba或qiniu` 时，使用云服务商图片处理功能，自动转 webp，默认对图片瘦身
2. 当 `provider=self` 时，期望用户准备好 webp 文件，判断浏览器环境支持 webp 时，请求 webp 图片
3. 当 `provider=none` 时，不对 src 做处理

### width/height

最好设置一下 width 或 height 属性，不需要带单位(100 而不是 100px)，以便懒加载功能能更好地运行（有一种情况是，如果图片高度为 0，则极有可能导致一次性加载多张图片）。

### lazyload

组件借助了[lazysizes](https://github.com/aFarkas/lazysizes)来实现懒加载功能，自动开启。

[⬆ Back to Top](#table-of-contents)

## Links

- [api](https://FEMessage.github.io/v-img/)
- [设计文档](https://www.yuque.com/docs/share/6edaadbb-9260-4b49-90d7-0a8d8d03b1de)
- [webp](https://developers.google.com/speed/webp)
- [alibaba oss guide](https://www.alibabacloud.com/help/doc-detail/47505.html?spm=a2c5t.11065259.1996646101.searchclickresult.2c802d29Uot0hD)
- [qiniu images processing doc](https://developer.qiniu.com/dora/api/1270/the-advanced-treatment-of-images-imagemogr2)
- [如何居中缩放 svg 图片](https://stackoverflow.com/a/11671373)
- [svg 缩放属性详解](https://css-tricks.com/scale-svg/)

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
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table><tr><td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=colmugx" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/commits?author=colmugx" title="Documentation">📖</a> <a href="https://github.com/FEMessage/v-img/commits?author=colmugx" title="Tests">⚠️</a> <a href="#translation-colmugx" title="Translation">🌍</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/commits?author=donaldshen" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/v-img/commits?author=donaldshen" title="Documentation">📖</a> <a href="#review-donaldshen" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/commits?author=evillt" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/v-img/commits?author=evillt" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt="Han"/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/v-img/issues?q=author%3Alianghx-319" title="Bug reports">🐛</a></td><td align="center"><a href="https://coldstone.fun"><img src="https://avatars1.githubusercontent.com/u/18013127?v=4" width="100px;" alt="Cold Stone"/><br /><sub><b>Cold Stone</b></sub></a><br /><a href="https://github.com/FEMessage/v-img/commits?author=xrr2016" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#projectManagement-levy9527" title="Project Management">📆</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)

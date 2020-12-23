# epub-list

> Made with create-storybook-react-library

[![NPM](https://img.shields.io/npm/v/epub-list.svg)](https://www.npmjs.com/package/epub-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://img.shields.io/travis/com/li-qiuli/epub-list)](https://travis-ci.com/github/li-qiuli/epub-list) [![Codecov](https://img.shields.io/codecov/c/github/li-qiuli/epub-list)](https://codecov.io/gh/li-qiuli/epub-list)

## Intro

This is a component for react.

## Feature

- [x] Easy-to-use
- [x] Typescript Support
- [x] Storybook UI component

## Install

```bash
npm install --save @21epub/epub-list
```

## Usage

```tsx
import React from 'react'
import ModuleListComponent from '@21epub/epub-list'
import '@21epub/epub-list/dist/index.css'
import { render } from 'react-dom'
interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    isShow: (arg0: boolean) => void
    getDetail: (arg0: Array<{}>, type: string) => void
    pagesize?: number
    urls: {
      common: {
        categoryurl: string
        searchjurl: string
        listsurl: string
        listurl: string
        changelisturl: string
        deletelisturl: string
      }
      [my: string]: {
        categoryurl: string
        searchjurl: string
        listsurl: string
        listurl: string
        changelisturl: string
        deletelisturl: string
      }
    }
  }
}

const baseurl = 'https://yapi.epub360.com/mock/125'
const getDetailMsg = (obj: [], type: string) => {
  console.log('huoquxiangxixinxi', obj, type)
}
const showModile = (iShow: boolean) => {
  console.log('关闭', iShow)
}
const args: moduleparam = {
  params: {
    navtitle: {
      titles: [{ name: '模块', selected: true, alias: 'common' }]
    },
    isShow: showModile,
    getDetail: getDetailMsg,
    pagesize: 20,
    urls: {
      common: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        searchjurl: baseurl + '/v3/api/admin/h5/overlays/',
        listsurl: baseurl + '/v3/api/admin/h5/overlays/',
        listurl: baseurl + '/v3/api/admin/h5/overlays/',
        changelisturl: baseurl + '/v3/api/admin/h5/overlays/',
        deletelisturl: baseurl + '/v3/api/admin/h5/overlays/'
      },
      my: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        searchjurl: baseurl + '/v3/api/admin/h5/overlays/',
        listsurl: baseurl + '/v3/api/admin/h5/overlays/',
        listurl: baseurl + '/v3/api/admin/h5/overlays/',
        changelisturl: baseurl + '/v3/api/admin/h5/overlays/',
        deletelisturl: baseurl + '/v3/api/admin/h5/overlays/'
      }
    }
  }
}

export const loadModule = () => {
  const frag = document.createElement('div')
  render(<ModuleListComponent {...args} />, frag)
}
```

For Details: See Example

## Developing and running on localhost

First install dependencies and then install peerDeps for storybook dev:

```sh
npm install
npm run install-peers
```

To run Example in hot module reloading mode:

```sh
npm start   # or npm run storybook
```

To create a bundle library module build:

```sh
npm run build
```

## Testing

To run unit tests:

```sh
npm test
```

## License

MIT © [li-qiuli](https://github.com/li-qiuli)

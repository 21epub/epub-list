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
export interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    isShow: (arg0: boolean) => void
    getDetail: (arg0: string | number, type: string) => void
    pagesize?: number
    urls: {
      common: {
        categoryurl: string
        alllistsurl: string
      }
      [my: string]: {
        categoryurl: string
        alllistsurl: string
      }
    }
    modulestyle?: {
      width: number
      subwidth: number
      initHeight?: number
    }
  }
  forceupdate?: boolean
}

const baseurl = 'https://yapi.epub360.com/mock/125'
const getDetailMsg = (obj: [], type: string, which: string) => {
  console.log('huoquxiangxixinxi', obj, type, which)
}
const showModile = (iShow: boolean) => {
  console.log('关闭', iShow)
}

const args: moduleparam = {
  params: {
    navtitle: {
      titles: [
        { name: '模块', selected: true, alias: 'common' },
        { name: '我的模块', selected: false, alias: 'my' }
      ]
    },
    isShow: showModile,
    getDetail: getDetailMsg,
    pagesize: 20,
    urls: {
      common: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        alllistsurl: baseurl + '/v3/api/admin/h5/overlays/'
      },
      my: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        alllistsurl: 'https://yapi.epub360.com/mock/148/api/tempaltes/'
      }
    },
    modulestyle: {
      width: 320,
      subwidth: 300,
      // width: 360,
      // subwidth: 107,
      initHeight: 160
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

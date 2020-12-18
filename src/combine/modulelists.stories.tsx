import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleListComponent } from './modulelists'
import 'antd/es/button/style/index.css'

interface Callback {
  (name: string): void
}
interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    getDetail: (arg0: Callback) => void
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
export default {
  title: 'ModuleComponent',
  component: ModuleListComponent,
  argTypes: {}
} as Meta
const getDetail = (obj) => {
  console.log('huoquxiangxixinxi', obj)
}
const Template: Story<moduleparam> = (args) => <ModuleListComponent {...args} />

export const lists = Template.bind({})

const baseurl = 'https://yapi.epub360.com/mock/125'
lists.args = {
  params: {
    navtitle: {
      titles: [
        { name: '模块', selected: true, alias: 'common' },
        { name: '我的模块', selected: false, alias: 'my' }
        // { name: '收藏', selected: false }
      ]
    },
    getDetail: getDetail,
    urls: {
      common: {
        categoryurl: '/v3/api/admin/h5/overlays/categories',
        searchjurl: baseurl + '/v3/api/admin/h5/overlays/',
        listsurl: baseurl + '/v3/api/admin/h5/overlays/',
        listurl: baseurl + '/v3/api/admin/h5/overlays/',
        changelisturl: baseurl + '/v3/api/admin/h5/overlays/',
        deletelisturl: baseurl + '/v3/api/admin/h5/overlays/'
      },
      my: {
        categoryurl: '/v3/api/admin/h5/overlays/categories',
        searchjurl: baseurl + '/v3/api/admin/h5/overlays/',
        listsurl: baseurl + '/v3/api/admin/h5/overlays/',
        listurl: baseurl + '/v3/api/admin/h5/overlays/',
        changelisturl: baseurl + '/v3/api/admin/h5/overlays/',
        deletelisturl: baseurl + '/v3/api/admin/h5/overlays/'
      }
    }
  }
}

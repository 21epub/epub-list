import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleListComponent } from './modulelists'
import 'antd/es/button/style/index.css'

interface moduleparam {
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
        searchjurl: string
        alllistsurl: string
        detailurl: string
        changelisturl: string
        deletelisturl: string
      }
      [my: string]: {
        categoryurl: string
        searchjurl: string
        alllistsurl: string
        detailurl: string
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
const getDetailMsg = (obj: number | string, type: string) => {
  console.log('huoquxiangxixinxi', obj, type)
}
const showModile = (iShow: boolean) => {
  console.log('关闭', iShow)
}
const Template: Story<moduleparam> = (args) => (
  <div {...args}>
    <ModuleListComponent {...args} />
    <div style={{ display: 'none' }}>
      <ModuleListComponent {...args} />
    </div>
  </div>
)

export const lists = Template.bind({})

const baseurl = 'https://yapi.epub360.com/mock/125'
lists.args = {
  params: {
    navtitle: {
      titles: [{ name: '模块', selected: true, alias: 'common' }]
    },
    isShow: showModile,
    getDetail: getDetailMsg,
    pagesize: 6,
    urls: {
      common: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        searchjurl: baseurl + '/v3/api/admin/h5/overlays/',
        alllistsurl: baseurl + '/v3/api/admin/h5/overlays/',
        detailurl: baseurl + '/v3/api/admin/h5/overlays/',
        changelisturl: baseurl + '/v3/api/admin/h5/overlays/',
        deletelisturl: baseurl + '/v3/api/admin/h5/overlays/'
      },
      my: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        searchjurl: baseurl + '/v3/api/admin/h5/overlays/',
        alllistsurl: baseurl + '/v3/api/admin/h5/overlays/',
        detailurl: baseurl + '/v3/api/admin/h5/overlays/',
        changelisturl: baseurl + '/v3/api/admin/h5/overlays/',
        deletelisturl: baseurl + '/v3/api/admin/h5/overlays/'
      }
    }
  }
}

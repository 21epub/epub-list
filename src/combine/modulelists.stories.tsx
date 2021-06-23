import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleListComponent } from './modulelists'
import 'antd/es/button/style/index.css'
import { moduleparam } from '../type/moduletype'

export default {
  title: 'ModuleComponent',
  component: ModuleListComponent,
  argTypes: {}
} as Meta
const getDetailMsg = (obj: number | string, type: string, which: string) => {
  console.log('huoquxiangxixinxi', obj, type, which)
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
      titles: [
        { name: '模块', selected: true, alias: 'common' },
        { name: '我的模块', selected: false, alias: 'my' }
      ]
    },
    isShow: showModile,
    getDetail: getDetailMsg,
    pagesize: 6,
    urls: {
      common: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        alllistsurl: baseurl + '/v3/api/admin/h5/overlays/'
      },
      my: {
        categoryurl: baseurl + '/v3/api/admin/h5/overlays/categories',
        alllistsurl: 'https://yapi.epub360.com/mock/148/api/tempaltes/'
      }
    }
    // modulestyle: {
    // width: 320,
    // subwidth: 300,
    // width: 360,
    // subwidth: 107,
    // initHeight: 160
    // }
  }
}

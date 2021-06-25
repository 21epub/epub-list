import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleComponent } from './module'
import 'antd/es/button/style/index.css'
import { ModuleListParam } from '../type/moduletype'
export default {
  title: 'ModuleComponent',
  component: ModuleComponent
} as Meta

const getMsg = (d: string, opttype: string) => {}
const Template: Story<ModuleListParam> = (args) => <ModuleComponent {...args} />

export const Test = Template.bind({})

Test.args = {
  modules: [
    {
      title: 'test',
      url: '',
      id: 3,
      thumbnail: ''
    },
    {
      title: 'test',
      url: '',
      id: 3,
      thumbnail: ''
    }
  ],
  marginLeft: 20,
  width: 320,
  initHeight: 160,
  getDetail: getMsg
}

import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { SortComponent } from './sort'
import 'antd/es/button/style/index.css'
interface TreeContent {
  title: string
  name: string | number
  [x: string]: string | number
}
export interface TreeData {
  items: Array<TreeContent>
}
export default {
  title: 'ModuleComponent',
  component: SortComponent
} as Meta

const Template: Story<TreeData> = (args) => <SortComponent {...args} />

export const sort = Template.bind({})
sort.args = {
  items: [
    { title: '主题', name: '主题' },
    { title: '主题', name: '主题' },
    { title: '主题', name: '主题' },
    { title: '主题', name: '主题' }
  ]
}

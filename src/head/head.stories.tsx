import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { HeadComponent } from './head'
import 'antd/es/button/style/index.css'
interface Title {
  titles: Array<{ name: string; selected: boolean }>
}
export default {
  title: 'ModuleComponent',
  component: HeadComponent
} as Meta

const Template: Story<Title> = (args) => <HeadComponent {...args} />

export const Head = Template.bind({})

Head.args = {
  titles: [
    { name: '模块', selected: true },
    { name: '我的模块', selected: false },
    { name: '收藏', selected: false }
  ]
}

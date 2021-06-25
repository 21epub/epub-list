import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { HeadComponent } from './head'
import 'antd/es/button/style/index.css'
import { HeadProps } from '../type/moduletype'

export default {
  title: 'ModuleComponent',
  component: HeadComponent
} as Meta

const getClickTitle = () => {}
const Template: Story<HeadProps> = (args) => <HeadComponent {...args} />

export const Head = Template.bind({})

Head.args = {
  titles: [
    { name: '模块', selected: true, alias: 'common' },
    { name: '我的模块', selected: false, alias: 'my' },
    { name: '收藏', selected: false, alias: 'favor' }
  ],
  changedTitle: getClickTitle
}

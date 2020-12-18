import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { SearchComponent } from './search'
import 'antd/es/button/style/index.css'

export default {
  title: 'ModuleComponent',
  component: SearchComponent,
  argTypes: {
    // title: {
    //   name: '文本',
    //   type: { name: 'string', required: false }
    // }
  }
} as Meta

const Template: Story<{ title: string; src: string }> = (args) => (
  <SearchComponent />
)

export const Search = Template.bind({})

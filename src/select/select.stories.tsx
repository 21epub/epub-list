import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { SelectComponent } from './select'
import 'antd/es/button/style/index.css'
interface TreeContent {
  title: string
  value: string
  [x: string]: number | string | Array<TreeContent>
}
interface ars {
  items: Array<TreeContent>
}

export default {
  title: 'ModuleComponent',
  component: SelectComponent
} as Meta

const Template: Story<ars> = (args) => <SelectComponent {...args} />

export const Select = Template.bind({})
Select.args = {
  items: [
    {
      title: 'Node1',
      value: '0-0',
      children: [
        { title: 'Child Node1', value: '0-0-1' },
        { title: 'Child Node2', value: '0-0-2' }
      ]
    },
    { title: 'Node2', value: '0-1' }
  ]
}

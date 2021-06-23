import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleComponent } from './module'
import 'antd/es/button/style/index.css'
import { ModuleListParam } from '../type/moduletype'
export default {
  title: 'ModuleComponent',
  component: ModuleComponent
} as Meta

const Template: Story<ModuleListParam> = (args) => <ModuleComponent {...args} />

export const Test = Template.bind({})

Test.args = {
  modules: [
    {
      title: 'test',
      url: '',
      id: 3
    },
    {
      title: 'test',
      url: '',
      id: 3
    }
  ]
}

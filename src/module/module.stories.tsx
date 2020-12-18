import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleComponent } from './module'
import 'antd/es/button/style/index.css'
interface Modules {
  modules: Array<{
    title: string
    url: string
    id: string | number
    [x: string]: string | number
  }>
}
export default {
  title: 'ModuleComponent',
  component: ModuleComponent
} as Meta

const Template: Story<Modules> = (args) => <ModuleComponent {...args} />

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

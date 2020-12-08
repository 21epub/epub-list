import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { ExampleComponent } from '.'
import 'antd/es/button/style/index.css'

export default {
  title: 'ExampleComponent',
  component: ExampleComponent,
  argTypes: {
    text: {
      name: '文本',
      type: { name: 'string', required: false }
    }
  }
} as Meta

const Template: Story<{ text: string }> = (args) => (
  <ExampleComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  text: 'This is a example'
}
Primary.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}

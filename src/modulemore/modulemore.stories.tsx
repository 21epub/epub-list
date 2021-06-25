import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ModuleMore } from './modulemore'
import 'antd/es/button/style/index.css'
import { ModuleListParam } from '../type/moduletype'
// import { DataClient } from '@21epub/epub-data-client'
export default {
  title: 'ModuleComponent',
  component: ModuleMore
} as Meta

const getMsg = (d: string, opttype: string) => {}
// const loadMore = (pagenum: number) => {
//     console.log(44444, pagenum);
//     let path = `?page=${pagenum}`
//     // if (keyword)
//     // path = `${path}&query=${keyword}`
//     // if (category)
//     // path = `${path}&category_id=${category}`
//     clientlists
//         .path(path)
//         .get()
//         .then((res) => { })
// }
const Template: Story<ModuleListParam> = (args) => <ModuleMore {...args} />

export const modulemore = Template.bind({})

modulemore.args = {
  modules: [
    {
      title: 'test',
      url: '',
      id: 3,
      thumbnail: ''
    },
    {
      title: 'test1',
      url: '',
      id: 4,
      thumbnail: ''
    },
    {
      title: 'test2',
      url: '',
      id: 5,
      thumbnail: ''
    },
    {
      title: 'test3',
      url: '',
      id: 6,
      thumbnail: ''
    },
    {
      title: 'test4',
      url: '',
      id: 6,
      thumbnail: ''
    }
  ],
  marginLeft: 20,
  width: 320,
  initHeight: 160,
  getDetail: getMsg,
  // LoadMore: loadMore,
  iconstyle: {
    width: '40px',
    height: '40px',
    padding: '0px'
  }
}
// const clientlists = new DataClient<any>('https://yapi.epub360.com/mock/125//v3/api/admin/h5/overlays/')

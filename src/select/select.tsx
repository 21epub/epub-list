import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { TreeSelect } from 'antd'

import { urlContext } from '../combine/modulelists'
interface TreeContent {
  title: string
  value: string
  [x: string]: number | string | Array<TreeContent>
}
export const SelectComponent = ({ items }: any) => {
  const [selectvalue, setSelectvalue] = useState('0-1')
  const value: any = useContext(urlContext)
  const { setCategory } = value

  const onChange = (value: string) => {
    console.log(value)
    setSelectvalue(value)
    setCategory(value)
  }
  return (
    <TreeSelect
      style={{ width: '46%' }}
      value={selectvalue}
      dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
      treeData={items}
      onChange={(value) => {
        onChange(value)
      }}
    />
  )
}

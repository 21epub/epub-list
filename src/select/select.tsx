import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { TreeSelect } from 'antd'

import { urlContext } from '../combine/modulelists'

export const SelectComponent = ({ items }: any) => {
  const [selectvalue, setSelectvalue] = useState('所有')
  const value: any = useContext(urlContext)
  const { setCategory } = value

  const onChange = (values: string) => {
    const value = values || ''
    setSelectvalue(value)
    setCategory(value)
  }
  return (
    <TreeSelect
      allowClear
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

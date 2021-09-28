import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { TreeSelect } from 'antd'
import { SwitchtToTreeDataList } from './treedata'
import { urlContext } from '../combine/modulelists'
import { concat } from 'ramda'

export const SelectComponent = ({ items }: any) => {
  const TreeDate = concat(
    [
      {
        title: '所有',
        value: '',
        children: []
      }
    ],
    SwitchtToTreeDataList(items)
  )

  const [selectvalue, setSelectvalue] = useState('所有')
  const value: any = useContext(urlContext)
  const { setCategory } = value

  const onChange = (values: string) => {
    const value = values || ''
    setSelectvalue(value)
    setCategory(value)
  }
  return (
    TreeDate.length > 0 && (
      <TreeSelect
        allowClear
        style={{ width: '46%' }}
        value={selectvalue}
        dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
        treeData={TreeDate}
        onChange={(value) => {
          onChange(value)
        }}
      />
    )
  )
}

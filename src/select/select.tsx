import React, { useContext, useMemo, useState } from 'react'
import 'antd/dist/antd.css'
import { TreeSelect } from 'antd'
import { SwitchtToTreeDataList } from './treedata'
import { urlContext } from '../combine/modulelists'
import { concat } from 'ramda'

export const SelectComponent = ({ items }: any) => {
  const TreeDate = useMemo(() => {
    const tree = concat(
      [
        {
          title: '所有',
          value: '',
          children: []
        }
      ],
      SwitchtToTreeDataList(items)
    )
    return tree
  }, items)

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
      treeData={TreeDate}
      onChange={(value) => {
        onChange(value)
      }}
    />
  )
}

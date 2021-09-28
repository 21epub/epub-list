import React, { useContext, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { TreeSelect } from 'antd'
import { CategoryList, getCategory } from './treedata'
import { urlContext } from '../combine/modulelists'

export const SelectComponent = ({ url }: any) => {
  const [TreeDate, setTreeDate] = useState<CategoryList[]>([])

  const [selectvalue, setSelectvalue] = useState('所有')
  const value: any = useContext(urlContext)
  const { setCategory } = value

  const getResult = async () => {
    const results = getCategory(url)
    setTreeDate(await results)
  }

  useEffect(() => {
    getResult()
  }, [url])

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

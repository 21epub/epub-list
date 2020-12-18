import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css'
// import './index.css'
import { Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons'

import { urlContext } from '../combine/modulelists'

export const SearchComponent = () => {
  const value: any = useContext(urlContext)
  const { setKeyword } = value
  const [inputvalue, setInputvalue] = useState('')
  const onSearch = (event) => {
    if ((event && event.target && event.target.value) || inputvalue) {
      const value = event.target.value || inputvalue
      setKeyword(value)
    }
  }
  const getValue = (event) => {
    const value = event.target.value
    setInputvalue(value)
  }
  const suffix = (
    <AudioOutlined
      onClick={(e) => onSearch(e)}
      style={{
        fontSize: 16,
        color: 'gray'
      }}
    />
  )
  return (
    <Input
      value={inputvalue}
      prefix={suffix}
      placeholder='搜索'
      allowClear
      onPressEnter={onSearch}
      onChange={getValue}
      style={{ width: '46%' }}
    />
  )
}

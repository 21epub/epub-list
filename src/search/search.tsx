import React, { memo, useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'
import { urlContext } from '../combine/modulelists'
import { SearchIcon } from '../Icon/icon'

export const SearchComponent = memo(() => {
  const value: any = useContext(urlContext)
  const { setKeyword } = value
  const [inputvalue, setInputvalue] = useState('')
  const onSearch = (event: any) => {
    setKeyword(inputvalue)
  }
  const getValue = (event: { target: { value: any } }) => {
    const value = event.target.value
    setInputvalue(value)
  }
  const suffix = (
    <SearchIcon
      style={{ color: 'gray', fontSize: 16 }}
      onClick={(e: { target: { value: string } }) => onSearch(e)}
    />
  )
  return (
    <Input
      value={inputvalue}
      prefix={suffix}
      placeholder='搜索'
      onPressEnter={onSearch}
      onChange={getValue}
      style={{ width: '46%' }}
    />
  )
})

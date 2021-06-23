import React, { memo, useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'
import Icon from '@ant-design/icons'

import { urlContext } from '../combine/modulelists'
const SearchSvg = () => (
  <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 1024 1024'>
    <path d='M927.104 866.816l-195.626667-208.768C780.629333 601.770667 810.666667 528.426667 810.666667 448 810.666667 271.530667 667.136 128 490.666667 128S170.666667 271.530667 170.666667 448 314.197333 768 490.666667 768c65.322667 0 126.08-19.754667 176.768-53.461333l197.461333 210.688L927.104 866.816zM256 448C256 318.592 361.258667 213.333333 490.666667 213.333333S725.333333 318.592 725.333333 448 620.074667 682.666667 490.666667 682.666667 256 577.408 256 448z' />
  </svg>
)
const SearchIcon = (props: any) => <Icon component={SearchSvg} {...props} />

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

import React, { useContext } from 'react'
import 'antd/dist/antd.css'

import { Space } from 'antd'
import styles from './sort.module.less'
import { urlContext } from '../combine/modulelists'
interface TreeContent {
  title: string
  name: string | number
  [x: string]: string | number
}
interface TreeData {
  items: Array<TreeContent>
}
export const SortComponent = ({ items }: TreeData) => {
  // const [selectvalue, setSelectvalue] = useState('0-1')
  const value: any = useContext(urlContext)
  const { setCategory } = value

  const selectSort = (e) => {
    const sort = e.currentTarget.getAttribute('data-value')
    setCategory(sort)
  }
  return (
    <Space size={[0, 0]} wrap align='center' style={{ margin: '0 10px' }}>
      {items.map((item, index) => (
        <div
          className={styles.sortlist}
          key={String(index)}
          data-value={index}
          onClick={(e) => {
            selectSort(e)
          }}
        >
          {item.name}
        </div>
      ))}
    </Space>
  )
}

import * as React from 'react'
import { useContext, useState } from 'react'
import { urlContext } from '../combine/modulelists'
import styles from './head.module.less'
interface Title {
  titles: Array<{ name: string; selected: boolean }>
}
export const HeadComponent = ({ titles }: Title) => {
  const [moduletitles, setModuletitles] = useState(titles)
  const value: any = useContext(urlContext)
  const { setmModuletype } = value
  const changeTitle = ({
    name,
    alias
  }: {
    name: string
    selected: boolean
    alias: string
  }) => {
    titles.map((item) => {
      const it = item
      if (it.name === name) {
        it.selected = true
      } else {
        it.selected = false
      }
    })
    setModuletitles([...titles])

    setmModuletype(alias)
  }
  return (
    <div className={styles.head}>
      <ul className={styles.titleorder}>
        {moduletitles.map((it, index) => (
          <li
            key={String(index)}
            className={it.selected ? styles.actived : styles.title}
            onClick={() => changeTitle(it)}
          >
            {it.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

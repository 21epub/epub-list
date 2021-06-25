import * as React from 'react'
import { useState } from 'react'
import { HeadProps } from '../type/moduletype'
import styles from './head.module.less'

export const HeadComponent = ({ titles, changedTitle }: HeadProps) => {
  const [moduletitles, setModuletitles] = useState(titles)
  const changeTitle = ({ name, alias }: { name: string; alias: string }) => {
    changedTitle({ name, alias })

    titles.map((item) => {
      const it = item
      if (it.name === name) {
        it.selected = true
      } else {
        it.selected = false
      }
    })
    setModuletitles([...titles])

    // setmModuletype(alias)
  }
  return (
    <div className={styles.head}>
      <ul className={styles.titleorder}>
        {moduletitles.map((it, index) => (
          <li
            key={String(index)}
            className={it.selected ? styles.actived : styles.title}
            style={{ cursor: 'pointer' }}
            onClick={() => changeTitle(it)}
          >
            {it.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

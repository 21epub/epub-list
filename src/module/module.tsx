import * as React from 'react'
import styles from './module.module.less'
// import Button from 'antd/es/button'
import { Popconfirm, message } from 'antd'

import { ParentReceive } from '../transmitdata/transmitdata'
interface Module {
  modules: Array<{
    title: string
    url: string
    id: string | number
    [x: string]: string | number
  }>
}

export const ModuleComponent = ({ modules }: Module) => {
  // const value: any = useContext(urlContext)
  // const { setDeleteid, setDetailid } = value

  const addToCanvas = (id: string) => {
    // message.success(id)
    ParentReceive.detailModuleId$.next(id)
  }
  const confirm = (id: number | string) => {
    ParentReceive.deleteModuleId$.next(id)
  }

  const cancel = () => {
    message.error('已取消删除')
  }

  return (
    <>
      {modules.map((item, index) => (
        <div key={String(index)} className={styles.list}>
          <div className={styles.content}>
            <div className={styles.icon}>
              <a
                className={styles.add_canvas}
                onClick={() => {
                  addToCanvas(String(item.id))
                }}
              >
                222
              </a>
            </div>
          </div>
          <div className={styles.head} data-id={item.id}>
            <div className={styles.title}>{item.title}</div>
            <div
              className={styles.delete}
              key={Math.floor(Math.random() * 1000)}
            >
              <Popconfirm
                title='确定删除?'
                onConfirm={() => confirm(item.id)}
                onCancel={cancel}
                okText='确定'
                cancelText='取消'
              >
                <div>删除</div>
              </Popconfirm>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

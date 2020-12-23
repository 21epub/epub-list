import * as React from 'react'
import styles from './module.module.less'
// import Button from 'antd/es/button'
import { Popconfirm, message } from 'antd'
import Icon from '@ant-design/icons'
import { ParentReceive } from '../transmitdata/transmitdata'
interface Module {
  modules: Array<{
    title: string
    url: string
    id: string | number
    [x: string]: string | number
  }>
}

const AddSvg = () => (
  <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 1024 1024'>
    <path
      d='M512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667c234.666667 0 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333zM725.333333 554.666667l-170.666667 0 0 170.666667-85.333333 0 0-170.666667L298.666667 554.666667l0-85.333333 170.666667 0L469.333333 298.666667l85.333333 0 0 170.666667 170.666667 0L725.333333 554.666667z'
      p-id='16471'
      fill='#ffffff'
    />
  </svg>
)
const AddIcon = (props: any) => <Icon component={AddSvg} {...props} />
const PreviewSvg = () => (
  <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 1024 1024'>
    <path
      d='M512.001023 62.389956c-248.322645 0-449.611068 201.288422-449.611068 449.609021 0 248.322645 201.288422 449.611068 449.611068 449.611068 248.282736 0 449.609021-201.288422 449.609021-449.611068C961.610044 263.678378 760.282736 62.389956 512.001023 62.389956zM787.606035 525.836123c-2.49789 4.342912-5.659907 7.700379-9.873882 10.19827L585.809029 646.483924 394.280902 757.199515c-13.075807 7.610328-30.054503 3.083222-37.862329-10.16757-2.457981-4.352121-3.51301-9.036817-3.51301-13.799284l-0.38988 0L352.515682 290.609751c0-15.300474 12.763698-27.516704 27.948539-27.516704 5.501294 0 10.81123 1.581008 15.260565 4.750187l190.085266 109.574604 191.922101 110.73401C790.767028 495.567749 795.255249 512.936325 787.606035 525.836123z'
      p-id='13265'
      fill='#ffffff'
    />
  </svg>
)
const deleteSvg = () => (
  <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 1024 1024'>
    <path
      d='M608 768c-17.696 0-32-14.304-32-32V384c0-17.696 14.304-32 32-32s32 14.304 32 32v352c0 17.696-14.304 32-32 32z m-192 0c-17.696 0-32-14.304-32-32V384c0-17.696 14.304-32 32-32s32 14.304 32 32v352c0 17.696-14.304 32-32 32z m512-544H768v-64c0-52.928-42.72-96-95.264-96H352c-52.928 0-96 43.072-96 96v64H96c-17.696 0-32 14.304-32 32s14.304 32 32 32h832c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-608-64c0-17.632 14.368-32 32-32h320.736C690.272 128 704 142.048 704 160v64H320v-64z m416.128 800H288.064c-52.928 0-96-43.072-96-96V383.52c0-17.664 14.336-32 32-32s32 14.336 32 32V864c0 17.664 14.368 32 32 32h448.064c17.664 0 32-14.336 32-32V384.832c0-17.664 14.304-32 32-32s32 14.336 32 32V864c0 52.928-43.072 96-96 96z'
      fill='#8a8a8a'
      p-id='2106'
    />
  </svg>
)
const DeleteIcon = (props: any) => <Icon component={deleteSvg} {...props} />
const PreviewIcon = (props: any) => <Icon component={PreviewSvg} {...props} />

export const ModuleComponent = ({ modules }: Module) => {
  // const value: any = useContext(urlContext)
  // const { setDeleteid, setDetailid } = value

  const addToCanvas = (id: string, type: string) => {
    // message.success(id)
    ParentReceive.detailModuleId$.next({ id, type })
  }
  const confirm = (id: number | string) => {
    ParentReceive.deleteModuleId$.next(id)
  }

  const cancel = () => {
    message.error('已取消删除')
  }

  return (
    <div>
      {modules.map((item, index) => (
        <div key={String(index)} className={styles.list}>
          <div
            className={styles.content}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              backgroundImage: `url(${item.thumbnail ? item.thumbnail : ''})`
            }}
          >
            <div className={styles.bg} />
            <div className={styles.icon}>
              <a
                className={styles.add_canvas}
                onClick={() => {
                  addToCanvas(String(item.id), 'add')
                }}
              >
                <AddIcon style={{ color: 'gray', fontSize: 37 }} />
              </a>
              <a
                className={styles.add_canvas}
                onClick={() => {
                  addToCanvas(String(item.id), 'preview')
                }}
              >
                <PreviewIcon style={{ color: 'gray', fontSize: 36 }} />
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
                <div>
                  <DeleteIcon style={{ color: 'gray', fontSize: 15 }} />
                </div>
              </Popconfirm>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

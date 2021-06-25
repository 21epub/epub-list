import * as React from 'react'
import styles from './modulemore.module.less'
import { ModuleListParam } from '../type/moduletype'
import { AddIcon, FavorIcon, PreviewIcon, DeleteIcon } from '../Icon/icon'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { LoadingOutlined } from '@ant-design/icons'

export const ModuleMore = ({
  modules,
  getDetail,
  width,
  marginLeft,
  initHeight,
  OptionalIcon,
  iconstyle = {}
}: // LoadMore
ModuleListParam) => {
  const [show] = useState(true)
  const [unique] = useState(2)
  const [pageStart] = useState(1)
  // const [show, setShow] = useState(true)
  // const [unique, setUnique] = useState(2)
  // const [pageStart, setPageStart] = useState(1)
  const [load] = useState(
    <div key='scroll-load' className={styles.loader}>
      <LoadingOutlined />
    </div>
  )
  const addToCanvas = (id: string, type: string) => {
    getDetail(id, type)
  }

  const loadFunc = (pagenum: number) => {
    // LoadMore(pagenum)
  }

  return (
    <div className={styles.lists}>
      {modules.length > 0 ? (
        <InfiniteScroll
          key={String(unique)}
          pageStart={pageStart}
          loadMore={(pagenum) => loadFunc(pagenum)}
          hasMore={false || show}
          initialLoad={false}
          loader={load}
          useWindow={false}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {modules.map((item, index) => (
              <div
                key={String(index)}
                className={styles.list}
                style={{ width: `${width}px`, marginLeft: `${marginLeft}px` }}
              >
                <div
                  className={styles.content}
                  style={{
                    backgroundSize: 'contain',
                    backgroundPosition: '50% 50%',
                    height: initHeight ? `${initHeight}px` : 'auto',
                    backgroundImage: initHeight
                      ? `url(${item.thumbnail})`
                      : 'none',
                    backgroundRepeat: ' no-repeat'
                  }}
                >
                  {!initHeight && (
                    <img
                      src={`${
                        item.thumbnail || '/staticfs2/materials/hd/fm.png'
                      }`}
                      style={{ width: `${width}px`, pointerEvents: 'none' }}
                    />
                  )}
                  <div
                    className={styles.hoverlist}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      height: '100%',
                      transform: 'rotate( 0deg) scale(1) translate(0%, 0%)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className={styles.bg} />
                    <div className={styles.icon}>
                      <a
                        className={styles.add_canvas}
                        style={iconstyle}
                        onClick={() => {
                          addToCanvas(String(item.id), 'add')
                        }}
                      >
                        <AddIcon />
                      </a>
                      <a
                        className={styles.add_canvas}
                        style={iconstyle}
                        onClick={() => {
                          addToCanvas(String(item.id), 'preview')
                        }}
                      >
                        <PreviewIcon />
                      </a>
                    </div>
                    {OptionalIcon === 'delete' && (
                      <div
                        className={styles.opticon}
                        onClick={() => {
                          addToCanvas(String(item.id), 'delte')
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    )}

                    {OptionalIcon === 'favor' && (
                      <div
                        className={styles.opticon}
                        onClick={() => {
                          addToCanvas(String(item.id), 'favor')
                        }}
                      >
                        <FavorIcon />
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.head} data-id={item.id}>
                  <div className={styles.title}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
          {!show && (
            <div key='scroll-load' className={styles.loader}>
              加载完成
            </div>
          )}
        </InfiniteScroll>
      ) : (
        ''
      )}
    </div>
  )
}

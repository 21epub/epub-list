import * as React from 'react'
import styles from './modulelists.module.less'
import { LoadingOutlined, LeftOutlined } from '@ant-design/icons'
import { SelectComponent } from '../select/select'
import { SearchComponent } from '../search/search'
import { ModuleComponent } from '../module/module'
// import { SortComponent } from '../sort/sort'
import { HeadComponent } from '../head/head'
import { createContext, memo, useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { DataClient } from '@21epub/epub-data-client'
import { modulelist, moduleparam } from '../type/moduletype'

export const urlContext = createContext({})

export const ModuleListComponent = memo((props: moduleparam) => {
  const {
    params: {
      navtitle,
      urls,
      getDetail,
      isShow,
      pagesize = 20,
      modulestyle = { width: 320, subwidth: 300, initHeight: null },
      iconstyle = {}
    },
    forceupdate
  } = props
  const [SelectedUrl, setSelectedUrl] = useState(urls.common)
  const [keyword, setKeyword] = useState(null)
  const [ModuleType, setModuleType] = useState('common')
  const [show, setShow] = useState(true)
  const [category, setCategory] = useState(null)
  const [pageStart, setPageStart] = useState(1)
  const [unique, setUnique] = useState(2)
  const [load] = useState(
    <div key='scroll-load' className={styles.loader}>
      <LoadingOutlined />
    </div>
  )

  const [page] = useState(1)
  const clientlists =
    SelectedUrl.alllistsurl &&
    useMemo(() => new DataClient<any>(SelectedUrl.alllistsurl), [
      SelectedUrl.alllistsurl
    ])

  const closeLoading = (res: any) => {
    if (res && res.length < pagesize) {
      setShow(false)
    }
  }
  const postMsgModule = (id: string, opttype: string) => {
    getDetail(id, opttype, ModuleType)
  }
  const modules: Array<modulelist> =
    (clientlists && clientlists.useData()) || []
  useEffect(() => {
    setUnique(Math.floor(Math.random() * 1000))
    setPageStart(page)
    let path = `?page=${page}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`
    setShow(true)
    clientlists &&
      clientlists
        .path(path)
        .get()
        .then((res) => {
          if (res) clientlists.updateLocal(res)
          closeLoading(res)
        })
    return () => {}
  }, [keyword, category, forceupdate, SelectedUrl])

  // 关闭module
  const closeModule = () => {
    isShow(false)
  }

  const loadFunc = (pagenum: number) => {
    console.log(modules.length, (pagenum - 1) * pagesize)
    if (modules.length < (pagenum - 1) * pagesize) {
      setShow(false)
      return
    }
    let path = `?page=${pagenum}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`

    clientlists &&
      clientlists
        .path(path)
        .get()
        .then((res) => {
          let data: Array<{}> = []
          if (res) data = res.concat(clientlists.getData())
          clientlists.updateLocal(data)
          closeLoading(res)
        })
  }
  const changeTitle = (msg: { name: string; alias: string }) => {
    setModuleType(msg.alias)
    setSelectedUrl(urls[msg.alias])
  }
  const colNum = Math.floor(modulestyle.width / modulestyle.subwidth)
  const degree = modulestyle.width - modulestyle.subwidth * colNum
  const marginLeft = Math.round(degree / (colNum + 1))

  return (
    <div
      className={styles.commonmodule}
      style={{ width: `${modulestyle.width}px` }}
    >
      <urlContext.Provider value={{ setKeyword, setCategory }}>
        <div className={styles.close} onClick={closeModule}>
          <LeftOutlined />
        </div>
        <div>
          <HeadComponent {...navtitle} changedTitle={changeTitle} />
          <div className={styles.inputmessage}>
            <SearchComponent />
            <SelectComponent url={SelectedUrl.alllistsurl} />
          </div>
        </div>
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
              <ModuleComponent
                {...{
                  modules,
                  getDetail: postMsgModule,
                  width: modulestyle.subwidth,
                  marginLeft: marginLeft,
                  initHeight: modulestyle.initHeight,
                  OptionalIcon: SelectedUrl?.OptionalIcon || null,
                  iconstyle
                }}
              />
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
      </urlContext.Provider>
    </div>
  )
})

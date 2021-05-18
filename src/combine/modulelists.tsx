import * as React from 'react'
import styles from './modulelists.module.less'
import { LoadingOutlined, LeftOutlined } from '@ant-design/icons'
import { SelectComponent } from '../select/select'
import { SearchComponent } from '../search/search'
import { ModuleComponent } from '../module/module'
// import { SortComponent } from '../sort/sort'
import { HeadComponent } from '../head/head'
import { createContext, useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { DataClient } from '@21epub/epub-data-client'

interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    isShow: (arg0: boolean) => void
    getDetail: (arg0: string | number, type: string) => void
    pagesize?: number
    urls: {
      common: {
        categoryurl: string
        searchjurl: string
        alllistsurl: string
        detailurl: string
        changelisturl: string
        deletelisturl: string
      }
      [my: string]: {
        categoryurl: string
        searchjurl: string
        alllistsurl: string
        changelisturl: string
        detailurl: string
        deletelisturl: string
      }
    }
  }
  forceupdate?: boolean
}
type list = {
  title: string
  url: string
  id: number
  [x: string]: string | number
}
// interface detailmsg {
//   id: string
//   type: string
// }
// const sortlist = {
//   items: [
//     { title: '主题', name: '主题' },
//     { title: '主题', name: '主题' },
//     { title: '主题', name: '主题' },
//     { title: '主题', name: '主题' }
//   ]
// }

export const urlContext = createContext({})

// export const ModuleListComponent = (props) => {
//   // let update=true
//   const [update, setUpdate] = useState(true)
//   setTimeout(() => {
//     setUpdate(!update)
//   }, 8000)
//   return (
//     <>
//       <ModuleListComponentT {...props}></ModuleListComponentT>
//     </>
//   )
// }

export const ModuleListComponent = (props: moduleparam) => {
  const {
    params: { navtitle, urls, getDetail, isShow, pagesize = 20 },
    forceupdate
  } = props
  const [keyword, setKeyword] = useState(null)
  const [show, setShow] = useState(true)
  const [category, setCategory] = useState(null)
  const [moduletype, setmModuletype] = useState('common')
  const [pageStart, setPageStart] = useState(1)
  const [unique, setUnique] = useState(2)
  const [load] = useState(
    <div key='scroll-load' className={styles.loader}>
      <LoadingOutlined />
    </div>
  )

  const [page] = useState(1)
  const url = urls[moduletype]
  const clientlists = useMemo(() => new DataClient<any>(url.alllistsurl), [
    url.alllistsurl
  ])

  const getcategory = useMemo(() => new DataClient<any>(url.categoryurl), [
    url.alllistsurl
  ])

  const moduleCategory = {
    items: getcategory.useData()
  }
  const closeLoading = (res: any) => {
    if (res && res.length < pagesize) {
      setShow(false)
    }
  }
  useEffect(() => {
    getcategory.getAll()
    return () => {}
  }, [])
  const modules: Array<list> = clientlists.useData()
  console.log('modules', modules)
  useEffect(() => {
    setUnique(Math.floor(Math.random() * 1000))
    console.log('首次调用接口', page, keyword, category)
    setPageStart(page)
    let path = `?page=${page}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`
    setShow(true)
    clientlists
      .path(path)
      .get()
      .then((res) => {
        if (res) clientlists.updateLocal(res)
        closeLoading(res)
        console.log('modules1', modules)
      })
    return () => {}
  }, [keyword, category, forceupdate])

  const closeModule = () => {
    isShow(false)
  }

  const loadFunc = (pagenum: number) => {
    console.log('下一页搜索信息', modules, pagenum, keyword, category)
    if (modules.length < (pagenum - 1) * pagesize) {
      setShow(false)
      return
    }
    let path = `?page=${pagenum}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`

    clientlists
      .path(path)
      .get()
      .then((res) => {
        let data: Array<{}> = []
        if (res) data = res.concat(clientlists.getData())
        clientlists.updateLocal(data)
        console.log('下一页', res)
        closeLoading(res)
      })
  }

  return (
    <div className={styles.commonmodule}>
      <urlContext.Provider value={{ setKeyword, setCategory, setmModuletype }}>
        <div className={styles.close} onClick={closeModule}>
          <LeftOutlined />
        </div>
        <div>
          <HeadComponent {...navtitle} />
          <div className={styles.inputmessage}>
            <SearchComponent />
            <SelectComponent {...moduleCategory} />
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
              <ModuleComponent {...{ modules, getDetail }} />
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
}

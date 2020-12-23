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
import { message } from 'antd'
import { DataClient } from '@21epub/epub-data-client'

import { ParentReceive } from '../transmitdata/transmitdata'

interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    isShow: (arg0: boolean) => void
    getDetail: (arg0: Array<{}>, type: string) => void
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
export const ModuleListComponent = ({
  params: { navtitle, urls, getDetail, isShow, pagesize = 20 }
}: moduleparam) => {
  const [keyword, setKeyword] = useState(null)
  const [category, setCategory] = useState(null)
  const [moduletype, setmModuletype] = useState('common')
  const [pageStart, setPageStart] = useState(1)
  const [unique, setUnique] = useState(2)
  const [load, setLoad] = useState(
    <div key='scroll-load' className={styles.loader}>
      <LoadingOutlined />
    </div>
  )

  const [page] = useState(1)
  // const [showmore, setShowmore] = useState(true)
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

  useEffect(() => {
    const subscription = ParentReceive.detailModuleId$.subscribe(
      ({ id, type }: any) => {
        const detailModule = new DataClient<any>(url.detailurl)
        detailModule
          .id(id)
          .get()
          .then((res) => {
            if (res) getDetail(res, type)
          })
          .catch(() => {
            message.error('获取详细信息失败')
          })
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const subscription = ParentReceive.deleteModuleId$.subscribe((id) => {
      const delteModule = new DataClient<any>(url.deletelisturl)
      delteModule
        .id(id)
        .delete()
        .then((res) => {
          message.success('删除成功')
          clientlists.id(id).deleteLocal()
        })
        .catch(() => {
          message.error('删除失败')
        })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  useEffect(() => {
    getcategory.getAll()
    return () => {}
  }, [])
  useEffect(() => {
    setUnique(Math.floor(Math.random() * 1000))
    clientlists.deleteLocal()
    // setShowmores
    console.log('首次调用接口', page, keyword, category)
    setPageStart(page)
    let path = `?page=${page}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`
    clientlists
      .path(path)
      .get()
      .then((res) => {
        if (res) clientlists.updateLocal(res)
      })
    return () => {}
  }, [keyword, category])
  const modules: Array<list> = clientlists.useData()
  console.log('modules', modules)

  const closeModule = () => {
    isShow(false)
  }

  const loadFunc = (pagenum: number) => {
    console.log('下一页搜索信息', modules, pagenum, keyword, category)
    if (modules.length < (pagenum - 1) * pagesize) {
      // setShowmore(false)
      setLoad(
        <div key='scroll-load' className={styles.loader}>
          加载完成
        </div>
      )
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
              hasMore={false || true}
              initialLoad={false}
              loader={load}
              useWindow={false}
            >
              <ModuleComponent {...{ modules }} />
            </InfiniteScroll>
          ) : (
            ''
          )}
        </div>
      </urlContext.Provider>
    </div>
  )
}

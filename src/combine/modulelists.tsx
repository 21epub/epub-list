import * as React from 'react'
import styles from './modulelists.module.less'
import { LoadingOutlined, LeftOutlined } from '@ant-design/icons'
import { SelectComponent } from '../select/select'
import { SearchComponent } from '../search/search'
import { ModuleComponent } from '../module/module'
import { SortComponent } from '../sort/sort'
import { HeadComponent } from '../head/head'
import { createContext, useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { message } from 'antd'
import { DataClient } from '@21epub/epub-data-client'
import { concat } from 'ramda'
import { ParentReceive } from '../transmitdata/transmitdata'
interface Callback {
  (name: string): void
}
interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    getDetail: (arg0: Callback) => void
    urls: {
      common: {
        categoryurl: string
        searchjurl: string
        listsurl: string
        listurl: string
        changelisturl: string
        deletelisturl: string
      }
      [my: string]: {
        categoryurl: string
        searchjurl: string
        listsurl: string
        listurl: string
        changelisturl: string
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

// const moduleCategory = {
//   items: [
//     {
//       title: 'Node1',
//       value: '0-0',
//       children: [
//         {
//           title: 'Child Node1',
//           value: '0-0-1'
//         },
//         {
//           title: 'Child Node2',
//           value: '0-0-2'
//         }
//       ]
//     },
//     {
//       title: 'Node2',
//       value: '0-1'
//     }
//   ]
// }

const sortlist = {
  items: [
    { title: '主题', name: '主题' },
    { title: '主题', name: '主题' },
    { title: '主题', name: '主题' },
    { title: '主题', name: '主题' }
  ]
}

export const urlContext = createContext({})
export const ModuleListComponent = ({
  params: { navtitle, urls, getDetail }
}: moduleparam) => {
  // debugger
  // const [selectedtitle,setSelectedtitle]=useState('my')
  const [keyword, setKeyword] = useState(null)
  const [category, setCategory] = useState(null)
  const [moduletype, setmModuletype] = useState('common')
  const [pageStart, setPageStart] = useState(1)
  const [unique, setUnique] = useState(2)

  const [moduleclass, setModuleclass] = useState(styles.commonmodule)
  const [page] = useState(1)
  const [showmore, setShowmore] = useState(true)
  const url = urls[moduletype]
  const clientlists = useMemo(() => new DataClient<any>(url.listsurl), [
    url.listsurl
  ])

  const getcategory = useMemo(() => new DataClient<any>(url.categoryurl), [
    url.listsurl
  ])

  const moduleCategory = {
    items: getcategory.useData()
  }

  useEffect(() => {
    const subscription = ParentReceive.detailModuleId$.subscribe((id) => {
      const detailModule = new DataClient<any>(url.deletelisturl)
      detailModule
        .id(id)
        .get()
        .then((res) => {
          getDetail(res)
        })
        .catch(() => {
          message.error('获取详细信息失败')
          console.log(99999, '获取详细信息失败')
        })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const subscription = ParentReceive.deleteModuleId$.subscribe((id) => {
      const delteModule = new DataClient<any>(url.listurl)
      delteModule
        .id(id)
        .delete()
        .then((res) => {
          message.success('删除成功')
          clientlists.id(id).deleteLocal()
        })
        .catch(() => {
          message.error('删除失败')
          // console.log(99999, '删除失败')
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
    setShowmore(true)
    console.log('首次调用接口', page, keyword, category)
    setPageStart(page)
    let path = `?page=${page}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`
    clientlists
      .path(path)
      .get()
      .then((res) => {
        clientlists.updateLocal(res)
      })
    return () => {}
  }, [keyword, category])
  const modules: Array<list> = clientlists.useData()
  console.log('modules', modules)

  const closeModule = () => {
    setModuleclass(styles.closecommonmodule)
  }

  const loadFunc = (pagenum: number) => {
    // setUnique(Math.floor(Math.random() * 1000))
    console.log('下一页搜索信息', modules, pagenum, keyword, category)
    if (modules.length < (pagenum - 1) * 6) {
      setShowmore(false)
      return
    }
    let path = `?page=${pagenum}`
    if (keyword) path = `${path}&query=${keyword}`
    if (category) path = `${path}&category_id=${category}`

    clientlists
      .path(path)
      .get()
      .then((res) => {
        const data = concat(clientlists.getData(), res)
        clientlists.updateLocal(data)
        console.log('下一页', res)
      })
  }
  return (
    <div className={moduleclass}>
      <urlContext.Provider value={{ setKeyword, setCategory, setmModuletype }}>
        <div className={styles.close} onClick={closeModule}>
          <LeftOutlined />
        </div>
        <div>
          <HeadComponent {...navtitle} />
          <SortComponent {...sortlist} />
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
              hasMore={false || showmore}
              initialLoad={false}
              loader={
                <div className={styles.loader}>
                  <LoadingOutlined />
                  {/* {showmore && <LoadingOutlined />} */}
                </div>
              }
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

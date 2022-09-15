export interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    level: number
    isShow: (arg0: boolean) => void
    // getDetail: (arg0: OptMsg) => void
    getDetail: (arg0: string | number, type: string, opt: string) => void
    pagesize?: number
    urls: {
      common: {
        categoryurl: string
        alllistsurl: string
        OptionalIcon?: 'favor' | 'delete'
      }
      [my: string]: {
        categoryurl: string
        alllistsurl: string
        OptionalIcon?: 'favor' | 'delete'
      }
    }
    modulestyle?: {
      width: number
      subwidth: number
      initHeight?: number
    }
    iconstyle?: object
  }
  forceupdate?: boolean
}

export interface modulelist {
  title: string
  url: string
  id: number
  [x: string]: string | number
}
export interface ModuleListParam {
  modules: Array<{
    title: string
    url: string
    id: string | number
    [x: string]: string | number
  }>
  getDetail: (id: string, opttype: string) => void
  width: number
  marginLeft?: number
  initHeight?: number | null
  OptionalIcon: string | null
  iconstyle?: object
  level: number
}

interface HeadList {
  name: string
  selected: boolean
  alias: string
}
export interface HeadProps {
  titles: Array<HeadList>
  changedTitle: (param: { name: string; alias: string }) => void
}

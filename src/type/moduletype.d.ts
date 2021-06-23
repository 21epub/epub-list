export interface moduleparam {
  params: {
    navtitle: {
      titles: Array<{ name: string; selected: boolean; alias: string }>
    }
    isShow: (arg0: boolean) => void
    // getDetail: (arg0: OptMsg) => void
    getDetail: (arg0: string | number, type: string, opt: string) => void
    pagesize?: number
    urls: {
      common: {
        categoryurl: string
        alllistsurl: string
      }
      [my: string]: {
        categoryurl: string
        alllistsurl: string
      }
    }
    modulestyle?: {
      width: number
      subwidth: number
      initHeight?: number
    }
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
  getDetail: (id: string | number, type: string) => void
  width: number
  marginLeft?: number
  initHeight?: number | null
}

// type OptMsg = {
//     opt: string,
//     optId: string,
//     where: string
// }

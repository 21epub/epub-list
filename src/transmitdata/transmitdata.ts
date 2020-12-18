import { Subject } from 'rxjs'

export const ParentReceive = {
  deleteModuleId$: new Subject<string | number>(),
  detailModuleId$: new Subject<string | number>(),
  searchMessage$: new Subject<{ keyword: string; category: string }>()
}

import { Subject } from 'rxjs'

export const ParentReceive = {
  deleteModuleId$: new Subject<string | number>(),
  detailModuleId$: new Subject<{ id: string; type: string }>(),
  searchMessage$: new Subject<{ keyword: string; category: string }>()
}

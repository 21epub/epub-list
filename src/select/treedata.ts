import { concat } from 'ramda'
import request from 'umi-request'
export type CategoryList = {
  id?: string | number
  title: string
  children: CategoryList[]
  value?: string
}

const mapCategoryToTreeData = (category: CategoryList) => {
  const { id, title, children, value } = category
  return {
    title,
    value: value || String(id),
    children: SwitchtToTreeDataList(children)
  }
}

export const SwitchtToTreeDataList = (
  categoryList: CategoryList[]
): CategoryList[] => {
  if (!categoryList) return []
  return categoryList.map((c: CategoryList) => mapCategoryToTreeData(c))
}

type ApiCategoryList = {
  data: {
    results: CategoryList[]
  }
}
export const getCategory = async (url: string) => {
  const {
    data: { results }
  } = await request.get<ApiCategoryList>(url)
  const tree = concat(
    [
      {
        title: '所有',
        value: '',
        children: []
      }
    ],
    SwitchtToTreeDataList(results)
  )
  return tree
}

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
  return categoryList.map((c: CategoryList) => mapCategoryToTreeData(c))
}

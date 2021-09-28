const mapCategoryToTreeData = (category) => {
  const { id, title, children } = category
  return {
    title,
    value: String(id),
    children: SwitchtToTreeDataList(children)
  }
}

export const SwitchtToTreeDataList = (categoryList) => {
  return categoryList.map((c) => mapCategoryToTreeData(c))
}

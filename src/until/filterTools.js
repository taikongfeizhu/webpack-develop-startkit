export function getIndustries (industry, industryId, secondIndustryId, industrySource) {
  const foundIndustry = industry.filter((item) => {
    return item.value === industryId
  })[0]
  if (foundIndustry) {
    const foundSecondIndustry = foundIndustry.children.filter((item) => {
      return item.value === secondIndustryId
    })[0]
    if (foundSecondIndustry) {
      return `${foundIndustry.label} - ${foundSecondIndustry.label}`
    } else {
      return `${foundIndustry.label}`
    }
  }
  return industrySource || '未知'
}

export function filterEmptyText (source) {
  if (source) {
    return source === '' ? '未知' : source
  }
  return '未知'
}

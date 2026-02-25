// composables/useDataParser.ts
export const useDataParser = () => {
  const parseCode = (code: string) => {
    const parts = code.split('-')
    return {
      type: parts[0] || '',        // P, F, S
      category: parts[1] || '',    // E, C, N, M, R
      subcategory: parts[2] || '', // a, b, c, d
      region: parts[3] || '',      // N, SE
      number: parts[4] || ''       // 序號
    }
  }

  const getCategoryName = (code: string) => {
    const parsed = parseCode(code)
    
    const pointCategoryMap: Record<string, string> = {
      'C': 'City',
      'N': 'Nature',
      'M': 'Museum',
      'R': 'Relaxation',
      'E': 'Everyone'
    }
    
    const foodCategoryMap: Record<string, string> = {
      'E': 'Everyone',
      'C': 'Carnivore',
      'V': 'Vegetarian',
      'M': 'Muslim',
      'S': 'Seafood'
    }
    
    const citySubMap: Record<string, string> = {
      'a': 'Shopping',
      'b': 'Creative Industries',
      'c': 'Club/Night Life',
      'd': 'Night Market'
    }
    
    const natureSubMap: Record<string, string> = {
      'a': 'Forest & Mountains',
      'b': 'Sea/Ocean'
    }
    
    const museumSubMap: Record<string, string> = {
      'a': 'History',
      'b': 'Art'
    }
    
    const relaxationSubMap: Record<string, string> = {
      'a': 'Outdoor Healing',
      'b': 'Indoor Healing'
    }

    let categoryName = ''
    if (parsed.type === 'P') {
      categoryName = pointCategoryMap[parsed.category] || parsed.category
    } else if (parsed.type === 'F') {
      categoryName = foodCategoryMap[parsed.category] || parsed.category
    }

    let subcategoryName = ''
    if (parsed.type === 'P') {
      switch (parsed.category) {
        case 'C':
          subcategoryName = citySubMap[parsed.subcategory] || ''
          break
        case 'N':
          subcategoryName = natureSubMap[parsed.subcategory] || ''
          break
        case 'M':
          subcategoryName = museumSubMap[parsed.subcategory] || ''
          break
        case 'R':
          subcategoryName = relaxationSubMap[parsed.subcategory] || ''
          break
      }
    }

    return subcategoryName ? `${categoryName}: ${subcategoryName}` : categoryName
  }

  return {
    parseCode,
    getCategoryName
  }
}
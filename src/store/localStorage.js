export const loadLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('clops-state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('clops-state', serializedState)
  } catch (err) {
    // Ignore errors
  }
}
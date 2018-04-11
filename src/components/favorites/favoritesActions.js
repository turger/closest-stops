import { ADD_FAVORITE_ROUTE, REMOVE_FAVORITE_ROUTE, SET_FILTER_FAVORITES } from './favoritesActionTypes'

export const setFavoriteRoute = route => ({
  route,
  type: ADD_FAVORITE_ROUTE
})

export const removeFavoriteRoute = route => ({
  route,
  type: REMOVE_FAVORITE_ROUTE
})

export const setFilterFavorites = filter => ({
  filter,
  type: SET_FILTER_FAVORITES
})
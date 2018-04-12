import { ADD_FAVORITE_ROUTE, REMOVE_FAVORITE_ROUTE, SET_FILTER_FAVORITES, SET_FAVORITE_ROUTES } from './favoritesActionTypes'

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

export const setFavoriteRoutes = route => ({
  route,
  type: SET_FAVORITE_ROUTES
})
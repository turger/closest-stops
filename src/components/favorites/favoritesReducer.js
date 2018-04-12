import { ADD_FAVORITE_ROUTE, REMOVE_FAVORITE_ROUTE, SET_FILTER_FAVORITES, SET_FAVORITE_ROUTES } from './favoritesActionTypes'

const initialSate = {
  routes: []
}

export default function favorites(state = initialSate, action) {
  switch (action.type) {
    case ADD_FAVORITE_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.route]
      }
    case REMOVE_FAVORITE_ROUTE: {
      return {
        ...state,
        routes: state.routes.filter(route => route !== action.route)
      }
    }
    case SET_FILTER_FAVORITES: {
      return {
        ...state,
        filterFavorites: action.filter
      }
    }
    case SET_FAVORITE_ROUTES: {
      return {
        ...state,
        routes: action.routes !== '' ? action.routes.split(',') : []
      }
    }
    default: 
      return state
  }
}
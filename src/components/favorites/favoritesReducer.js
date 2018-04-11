import { ADD_FAVORITE_ROUTE, REMOVE_FAVORITE_ROUTE, SET_FILTER_FAVORITES } from './favoritesActionTypes'

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
    default: 
      return state
  }
}
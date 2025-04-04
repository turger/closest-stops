import Pagewrapper from './Pagewrapper'
import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Stops = lazy(() => import('./Stops'))
const RoutesComponent = lazy(() => import('./Routes'))
const StopTimes = lazy(() => import('./StopTimes'))
const Vehicle = lazy(() => import('./Vehicle'))
const Warning = lazy(() => import('./Warning'))

const LoadingFallback = () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Pagewrapper />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Stops />
            </Suspense>
          )
        },
        {
          path: 'routes',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <RoutesComponent />
            </Suspense>
          )
        },
        {
          path: 'stoptimes',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <StopTimes />
            </Suspense>
          )
        },
        {
          path: 'vehicle',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Vehicle />
            </Suspense>
          )
        },
        {
          path: 'warning',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Warning />
            </Suspense>
          )
        }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true
    }
  }
)

const AppRoutes = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes

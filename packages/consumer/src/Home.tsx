import React, { Suspense, lazy } from 'react'

const OtherComponent = lazy(() => import('Home2'))

export default () => (
  <div onClick={() => import('module1').then(x => console.log('dynamic import: ', x))}>
    dddddd
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  </div>
)

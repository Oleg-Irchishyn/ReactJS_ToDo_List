import React, { Suspense } from 'react';
import Preloader from '../components/common/Preloader';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<Preloader />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

// just for update
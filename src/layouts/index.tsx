import React from 'react';
import BaseLayout from './baseLayout';

export default function(props: any) {
  const { pathname } = props.location;

  if (pathname !== '/start') {
    return <BaseLayout>{props.children}</BaseLayout>;
  }

  return props.children;
}

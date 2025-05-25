import type { MetaArgs } from 'react-router'

export function meta({}: MetaArgs) {
  return [
    { title: 'Home' },
    { name: 'description', content: 'This is home!' },
  ]
}

export default function Home() {
  return <>Hello World!!</>
}

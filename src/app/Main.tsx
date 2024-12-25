import type { ReactNode } from 'react';

export default function Main ({ children, ...props }: { children: ReactNode }) {
  return (
    <main {...props}>
      {children}
    </main>
  )
}

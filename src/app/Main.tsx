import type { ReactNode } from 'react';

export default function Main ({ children, ...props }: { children: ReactNode, className: string }) {
  return (
    <main {...props}>
      {children}
    </main>
  )
}

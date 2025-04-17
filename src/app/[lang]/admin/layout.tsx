// COMPONENTS
import Categories from '@/app/[lang]/admin/Categories';

export default function Layout ({children}: any) {
  return (
    <div
      className="flex flex-row bg-red-300"
    >
      <Categories
        className="h-full bg-[var(--background-light-color)]"
      />
      <section
        className="flex-1 h-full bg-yellow-400"
      >
        {children}
      </section>
    </div>
  )
}
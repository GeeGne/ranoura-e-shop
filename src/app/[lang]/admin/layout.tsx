// COMPONENTS
import Categories from '@/app/[lang]/admin/Categories';
import CurrentCategoryAndBackToHome from '@/app/[lang]/admin/CurrentCategoryAndBackToHome';

export default function Layout ({children}: any) {
  return (
    <div
      className="flex flex-row bg-red-300"
    >
      <Categories
        className="h-full bg-[var(--background-light-color)]"
      />
      <section
        className="flex-1 flex flex-col gap-4 h-full bg-yellow-400"
      >
        <CurrentCategoryAndBackToHome />
        {children}
      </section>
    </div>
  )
}
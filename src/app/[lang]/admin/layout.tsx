// COMPONENTS
import Categories from '@/app/[lang]/admin/categories/index';
import CurrentCategoryAndBackToHome from '@/app/[lang]/admin/CurrentCategoryAndBackToHome';

export default function Layout ({children}: any) {
  return (
    <div
      className="flex flex-row"
    >
      <Categories
        className="sticky top-0 h-screen"
      />
      <section
        className="flex-1 flex flex-col gap-4 p-4 h-full"
      >
        <CurrentCategoryAndBackToHome />
        {children}
      </section>
    </div>
  )
}
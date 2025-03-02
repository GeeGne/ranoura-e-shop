// HOOKS
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// COMPONENTS

// STORES
import { useCartStore, useNavbarStore } from '@/stores/index';

// JSON
import categories from '@/json/categories.json';

type Props = {
  isWindowScrolled?: any;
  tabName?: string;
}

export default function CategoryListLg ({ isWindowScrolled, tabName }: Props) {

  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);
  const setSelectedCategory = useNavbarStore((status:any) => status.setSelectedCategory);
  const selectedCategory = useNavbarStore((status:any) => status.selectedCategory);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type, categoryKey } = e.currentTarget.dataset;

    switch (type) {
      case 'category_button_is_clicked':
        setNavbarToggle(false);
        setSelectedCategory(categoryKey);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'category_button_is_clicked':
        setNavbarToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <ul
      className="hidden lg:flex gap-4"
      data-type="ar_button_is_clicked"
      onClick={handleClick}
    >
      {categories.map((category, i) => 
        <Link
          href={`/shop/category/${selectedCategory}`}
          className={`
            text-lg cursor-pointer z-[25] hover:underline hover:font-bold
            transition-all ease-in-out duration-200
            ${navbarToggle 
              ? 'text-heading' 
              : isWindowScrolled
                ? "text-heading-invert nav-button-hover-effect"
                : (tabName === 'home')
                  ? "text-heading-invert"
                  : "text-heading"
            }
          `}
          data-type="category_button_is_clicked"
          data-category-key={category.slug}
          onClick={handleClick}
          onMouseEnter={() => {setNavbarToggle(true); setSelectedCategory(category.slug)}}
          onMouseLeave={() => setNavbarToggle(false)}
          key={i}
        >
          {category.name}
        </Link>  
      )}
    </ul>

  )
}
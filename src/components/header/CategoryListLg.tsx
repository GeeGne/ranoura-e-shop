// HOOKS
import { useState, useEffect, useRef } from "react";

// COMPONENTS

// STORES
import { useCartStore, useNavbarStore } from '@/stores/index';

// JSON
import categories from '@/json/categories.json';

export default function CategoryListLg () {

  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);
  const setSelectedCategory = useNavbarStore((status:any) => status.setSelectedCategory);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, categoryKey } = e.currentTarget.dataset;

    switch (type) {
      case 'category_button_is_clicked':
        setNavbarToggle(true);
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
        <span
          className={`
            text-lg cursor-pointer z-[25] hover:underline hover:font-bold
            transition-all ease-in-out duration-200
            ${navbarToggle ? 'text-heading' : 'text-heading-invert nav-button-hover-effect'}
          `}
          data-type="category_button_is_clicked"
          data-category-key={category.key}
          onClick={handleClick}
        onMouseEnter={() => {setNavbarToggle(true); setSelectedCategory(category.key)}}
          onMouseLeave={() => setNavbarToggle(false)}
          key={i}
        >
          {category.title}
        </span>  
      )}
    </ul>

  )
}
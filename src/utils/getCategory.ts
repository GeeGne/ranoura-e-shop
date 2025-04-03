export default function getCategory (categories: any, selectedCategory: string) {
  return categories.find((category: any) => category.slug === selectedCategory)
};

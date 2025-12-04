export default function getProduct (products: any[], productId: string) {
  if (!products) return {};
  return products.find(product => product.id === productId) ||  {};
}

export default function getProduct (productId: number, products: any[]) {
  return products.find(product => product.id === productId);
}

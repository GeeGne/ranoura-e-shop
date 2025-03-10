export default function getProduct (products: any[], productId: number) {
  return products.find(product => product.id === productId);
}

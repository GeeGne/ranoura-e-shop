export default function strSlugForProducts (productName: string, productId: number) {

  return productName.trim().replaceAll(' ', '-') + '-' + productId;
}
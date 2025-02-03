type Props = {
  price?: number;
  discount?: number;
}

function calculatePriceAfterDiscount({ price = 0, discount = 0 }: Props) {
  return Math.trunc(price - (price * discount / 100));
}

export default calculatePriceAfterDiscount;
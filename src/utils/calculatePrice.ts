type Props = {
  price?: number;
  discount?: number;
  quantity?: number;
}

function calculatePrice(price: number = 0, discount: number = 0, quantity: number = 1) {
  const total = price * quantity;
  return Math.trunc(total - (total * discount / 100));
}

export default calculatePrice;
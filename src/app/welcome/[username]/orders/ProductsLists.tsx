// ASSETS
const outfit1 = "/assets/img/outfit-2.jpg";

type Props = {
  productsArray?: any[];
  className?: string;
} & React.ComponentPropsWithRef<"ul">;

export default function ProductsLists ({productsArray, className, ...props}: Props) {
  return (
    <ul
      className={`flex flex-col gap-8`}
    >
      {productsArray?.map((product, i) =>
        <li
          className="grid grid-cols-[auto_1fr] gap-2"
          key={i}
        >
          <img 
            alt="Photo"
            src={product.image}
            className="my-auto row-span-5 w-[100px] aspect-[2/3] rounded-md drop-shadow-md"
          />
          <h3 className="flex text-heading justify-end">
            Winter Sweater
          </h3>
          <div className="flex text-heading font-bold gap-2 items-center justify-end">
            <span>
              {product.size}
            </span>{' | '}
            <span>
              {product.color.toUpperCase()}
            </span>
            <div className="w-4 h-4 bg-black rounded-full" />
          </div>
          <div className="flex gap-2 text-sm justify-end">
            <h3 className="text-body">
              ID:
            </h3>
            <h3 className="text-heading font-bold">
              {product.id}
            </h3>
          </div>
          <div className="flex gap-2 text-sm justify-end">
            <h3 className="text-body">
              Quantity:
            </h3>
            <h3 className="text-heading font-bold">
              {product.quantity}
            </h3>
          </div>
          <div className="flex gap-2 text-sm justify-end">
            <h3 className="text-body">
              Price:
            </h3>
            <h3 className="text-heading font-bold">
              {product.price}
            </h3>
          </div>
          <div className="col-span-2 flex gap-2 font-bold text-lg justify-between">
            <h3 className="text-body font-nold">
              Total Amount
            </h3>
            <h3 className="text-heading font-bold">
              {product.total}
            </h3>
          </div>
        </li>
      )}
    </ul>

  )
}
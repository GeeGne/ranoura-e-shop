export default function PriceTag ({ discount = false }) {
  return (
    <div>
      {discount
        ?  <div
            className="text-heading text-lg font-bold"
          >
            400 SYP
          </div>
        : <div
            className="flex flex-col"
          >
            <div
              className="flex items-center gap-2"
            >
              <span
                className="text-red-600 text-lg font-bold"
              >
                200 SYP
              </span>
              <s
                className="text-body-light text-lg font-bold"
              >
                400 SYP
              </s>
            </div> 
            <span
              className="text-body text-sm font-bold"
            >
              50% Off
            </span>
          </div>
      }
    </div>
  )
}
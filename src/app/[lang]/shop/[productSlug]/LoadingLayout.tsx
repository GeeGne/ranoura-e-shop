// COMPONENTS
import BreadCrumb from '@/components/BreadCrumb';
import ProductDisplay from '@/components/productPage/ProductDisplay';

export default function LoadingLayout () {
  return (
    <div
      className="
        flex flex-col gap-8 md:gap-8 p-4 
        md:grid md:grid-cols-2 md:max-w-[1400px] md:mx-auto
      "
    >
      <BreadCrumb
        className="md:col-span-2"
        slugNameAndLinkArray={slugNameAndLinkArray} 
      />
      <ProductDisplay 
        className="md:row-span-2 md:max-w-[600px] md:mx-auto"
        imagesArray={getImagesUrls(product?.images || [])}
      />
      <section
        className="flex flex-col gap-4 md:row-span-2 md:py-8 lg:row-span-1"
      >
        <h2
          className="text-lg font-bold text-heading"
        >
          {product?.name[isEn ? 'en' : 'ar']}
        </h2>
        <h3
          className="text-md text-body"
        >
          {product?.description[(isEn ? 'en' : 'ar')]}
        </h3>
        <PriceTag price={product?.price} discount={product?.discount_percent}/>
        <ProductSize sizes={product?.sizes} />
        <ColorPallete 
          className="mb-4"
          width="w-6"
          height="h-6"
          colorsArray={product?.colors}
          productId={product?.id}
          pickFirstIndexByDefault={false}
          setColor={pickedColor}
          setColorTrigger={setColorTrigger}
          currentColor={onColorChange}
        />
        <section
          className="hidden lg:inline md:col-span-2 lg:col-span-2"
        >
          {product?.lists.map(({ title, descriptionLists }, i) => 
            <ProductLists
              key={i}
              title={title[isEn ? 'en' : 'ar']}
              descArray={descriptionLists[isEn ? 'en' : 'ar']}
              data-type="productList_is_clicked"
              data-index={i}
              toggle={productListsActiveIndex === i ? true : false}
              onClick={handleClick}
            />
          )}
        </section>
        <div
          className="
            relative flex w-full mt-auto
          "
        >
          <BtnA
            className={`
              order-2 flex-1 flex justify-center items-center 
              gap-2 font-bold text-base text-heading-invert 
              cool-bg-grad-m py-2
              ${isEn ? 'rounded-r-lg' : 'rounded-l-lg'}
            `}
            data-type="add_to_bag_button_is_clicked"
            data-product-name={product?.name[(isEn ? 'en' : 'ar')]}
            onClick={handleClick}
          >
            <FamiconsBagAddOutlineBold 
              width={16} 
              height={16}
            />
            {isEn ? 'ADD TO BAG' : 'اضف الى السله'}
          </BtnA>
          <label
            className="
              relative order-1 relative flex z-[10]
            "
          >
            <input 
              className={`
                peer w-16 bg-transparent text-left
                text-heading text-md font-bold px-4 focus:outline-none
                border-solid border-[#0a0908] border-[2px]
                ${isEn ? 'rounded-l-lg' : 'rounded-r-lg'}
              `}
              name="quantity"
              id="quantity"
              type="text"
              value={searchParams.get("quantity") || 1}
              readOnly
              ref={quantitiyInptRef}
            />
            <LineMdChevronSmallDown 
              className="
                absolute top-1/2 right-4 translate-y-[-50%] w-4 h-4 text-heading
              "
            />
            <ul
              className={`
                absolute top-full left-0 
                w-full text-body text-md rounded-md bg-background drop-shadow-lg
                origin-top scale-y-[0%] peer-focus:scale-y-[100%]
                invisible peer-focus:visible opacity-0 peer-focus:opacity-100
                transition-all delay-100 duration-200 ease-in-out
              `}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num =>
                <li
                  className="
                    text-center hover:bg-content-invert hover:font-bold hover:text-content 
                    m-1 rounded-md cursor-pointer
                    transition-all duration-200 ease-in-out
                  "
                  key={num}
                  data-quantity={num}
                  data-type="quantity_list_is_clicked"
                  onClick={handleClick}
                >
                  {num}
                </li>
              )}
            </ul>
          </label>
        </div>
      </section>
      <section
        className="lg:hidden md:col-span-2 lg:col-span-1"
      >
        {product?.lists.map(({ title, descriptionLists }, i) => 
          <ProductLists
            key={i}
            title={title[isEn ? 'en' : 'ar']}
            descArray={descriptionLists[isEn ? 'en' : 'ar']}
            data-type="productList_is_clicked"
            data-index={i}
            toggle={productListsActiveIndex === i ? true : false}
            onClick={handleClick}
          />
        )}
      </section>
    </div>
  )
}
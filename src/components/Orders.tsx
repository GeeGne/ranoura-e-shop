// COMPONENTS
import MdiCardAccountDetails from '@/components/svgs/MdiCardAccountDetails';
import LetsIconsOrderFill from '@/components/svgs/LetsIconsOrderFill';

// JSON
import orders from '@/json/userOrders.json';

type Props = {
  lang?: 'en' | 'ar';
  isEn?: boolean;
};

export default function Orders ({ lang = 'en', isEn = true }: Props) {

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString((isEn ? 'en' : 'ar-EG'), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  const getTimeAgo = (dateStr: string) => {
    const date: any = new Date(dateStr);
    const now: any = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} days ago`;
  }

  const statusColors = {
    PENDING: "#FFA500",     
    CONFIRMED: "#3498DB",   
    PROCESSING: "#9B59B6", 
    ONDELIVERY: "#F39C12",  
    SHIPPED: "#2980B9",     
    DELIVERED: "#27AE60",   
    CANCELED: "#E74C3C",    
    REFUNDED: "#95A5A6"  
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
      <thead
        className="bg-gray-50"
      >
        <tr>
          <th 
            scope="col" 
            className={`
              px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
              uppercase tracking-wider
            `}
          >
            {isEn ? 'Order Details' : 'معلوامات الطلب'}
          </th>
          <th 
            scope="col" 
            className={`
              px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
              uppercase tracking-wider
            `}
          >
            {isEn ? 'Status' : 'الحال'}
          </th>
          <th 
            scope="col" 
            className={`
              px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
              uppercase tracking-wider
            `}
          >
            {isEn ? 'Order Date' : 'تاريخ الطلب'}
          </th>
          <th 
            scope="col" 
            className={`
              px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
              uppercase tracking-wider
            `}
          >
            {isEn ? 'Total' : 'المجموع'}
          </th>
          <th 
            scope="col" 
            className={`
              px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
              uppercase tracking-wider
            `}
          >
            {isEn ? 'Options' : 'الخيارات'}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-sm text-body-light">ID: </span>
              <span className="font-bold text-sm text-body-light">{orders.id}</span>
            </div>
            <div>
              <span className="text-sm text-body-light">Number of items: </span>
              <span className="font-bold text-sm text-body-light">{orders.products.length} </span>
              <span className="text-sm text-body-light">Ordered at: </span>
              <span className="font-bold text-sm text-body-light">{getTimeAgo(orders.created_at)}</span>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span 
            className="relative text-xs font-bold py-1 px-2"
            style={{ color: statusColors[orders.status]}}
          >
            {orders.status.toLowerCase()}
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
            style={{ backgroundColor: statusColors[orders.status]}}
          />
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
          {formatDate(orders.created_at)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
          {orders.total}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
          <div className="flex gap-2">
            <LetsIconsOrderFill 
              className="
                w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                bg-background-light hover:bg-background-deep-light
                active:opacity-60
                transition-all duration-200 ease-out
              "
              role="button"
            />
            <MdiCardAccountDetails 
              className="
                w-7 h-7 p-[5px] text-heading rounded-md cursor-pointer
                bg-background-light hover:bg-background-deep-light
                active:opacity-60
                transition-all duration-200 ease-out
              "
              role="button"
            />
          </div>
        </td>
      </tbody>
    </table>
  )
}
import { LoaderCircle, ReceiptText } from 'lucide-react';
import { useGetOrdersForCurrentSession } from '../../api/apihooks/useOrder';

type SessionOrder = {
  _id: string;
  orderNumber: number;
  status: string;
  total: number;
  items: { name: string; quantity: number }[];
  createdAt?: string;
};

const statusStyles: Record<string, string> = {
  received: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
  preparing: 'border-sky-400/20 bg-sky-400/10 text-sky-200',
  ready: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  completed: 'border-[#77766E]/30 bg-white/5 text-[#C7C2B8]',
  cancelled: 'border-red-400/20 bg-red-400/10 text-red-200',
};

const SessionOrders = ({ enabled, sessionId }: { enabled: boolean; sessionId?: string }) => {
  const { data = [], isPending, isError, refetch } = useGetOrdersForCurrentSession(enabled, sessionId);
  const orders = data as SessionOrder[];

  return (
    <section aria-labelledby="table-orders-title" className="mt-8 rounded-2xl border border-[#2C2E2C] bg-[#1F2120] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#383936] bg-[#17181A] text-[#E2793D]">
          <ReceiptText size={18} />
        </span>
        <div>
          <h2 id="table-orders-title" className="text-base font-semibold text-[#FBF8F2]">Orders at this table</h2>
          <p className="mt-1 text-xs text-[#9A958C]">Orders placed by everyone sharing this table session.</p>
        </div>
      </div>

      {isPending ? (
        <div className="mt-5 flex items-center gap-2 text-sm text-[#B5B0A6]" role="status">
          <LoaderCircle className="animate-spin text-[#E2793D]" size={16} />
          Loading table orders...
        </div>
      ) : isError ? (
        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-red-200" role="alert">
          <span>We couldn&apos;t load the table&apos;s orders.</span>
          <button className="font-semibold text-[#E2793D] hover:text-[#F29A67]" onClick={() => void refetch()} type="button">
            Try again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <p className="mt-5 text-sm text-[#9A958C]">No orders have been placed at this table yet.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {orders.map((order) => (
            <li key={order._id} className="rounded-xl border border-[#343633] bg-[#191B1A] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#FBF8F2]">Order #{order.orderNumber}</p>
                  {order.createdAt && (
                    <time className="mt-1 block text-xs text-[#8C8676]" dateTime={order.createdAt}>
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </time>
                  )}
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[order.status] ?? statusStyles.completed}`}>
                  {order.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#B5B0A6]">
                {order.items.map((item) => `${item.quantity} × ${item.name}`).join(' · ')}
              </p>
              <p className="mt-3 text-right text-sm font-semibold text-[#FBF8F2]">${order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SessionOrders;

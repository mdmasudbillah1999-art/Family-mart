import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  Printer, 
  Eye,
  FileText
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchSearch = !search || 
      o.id.toLowerCase().includes(search.toLowerCase()) || 
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Delivered':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Orders Management
          </h2>
          <p className="text-xs text-slate-500">
            Track and dispatch customer orders, update statuses, and print invoices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
            Total Orders: <strong className="text-slate-900">{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-slate-100 rounded-xl">
          {(['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, name, phone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{order.id}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-[10px] text-slate-400">{order.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">
                    {order.productsSummary}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 tabular-nums">
                    ৳ {order.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-semibold ${order.paymentMethod === 'bKash' ? 'text-pink-600' : 'text-slate-700'}`}>
                      {order.paymentMethod}
                    </span>
                    <span className={`block text-[10px] font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold px-2 py-1 rounded-md border cursor-pointer ${getStatusBadge(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{order.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="View full invoice"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 font-heading">
                  Invoice: {selectedOrder.id}
                </h3>
                <span className="text-xs text-slate-500">Date: {selectedOrder.date}</span>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                <p className="font-bold text-slate-800">Billed To:</p>
                <p className="text-slate-700">{selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
                <p className="text-slate-500">{selectedOrder.shippingAddress}, {selectedOrder.city}</p>
                {selectedOrder.customerEmail && <p className="text-slate-500">{selectedOrder.customerEmail}</p>}
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Purchased Products:</span>
                <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span>{it.productName} (x{it.quantity})</span>
                        <span className="font-bold tabular-nums">৳ {(it.price * it.quantity).toLocaleString()}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between items-center text-xs">
                      <span>{selectedOrder.productsSummary}</span>
                      <span className="font-bold tabular-nums">৳ {selectedOrder.amount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
                <span>Grand Total:</span>
                <span className="text-emerald-900 font-heading tabular-nums">৳ {selectedOrder.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => alert('Printing invoice for order ' + selectedOrder.id)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

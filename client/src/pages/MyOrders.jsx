import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

const statusMap = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-400" },
  paid: { label: "Đã thanh toán", color: "text-blue-400" },
  shipping: { label: "Đang giao", color: "text-orange-400" },
  done: { label: "Hoàn thành", color: "text-green-400" },
  cancelled: { label: "Đã hủy", color: "text-red-400" },
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders/my")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Đơn hàng của tôi</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl h-28 animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 mb-4">Chưa có đơn hàng nào</p>
            <Link to="/" className="text-violet-400 hover:text-violet-300">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm text-slate-400">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <span
                    className={`text-sm font-medium ${statusMap[order.status].color}`}
                  >
                    {statusMap[order.status].label}
                  </span>
                </div>
                <div className="flex gap-2 mb-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-sm text-slate-400">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-400">
                    {order.items.length} sản phẩm
                  </p>
                  <p className="font-bold text-violet-300">
                    {order.totalAmount.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

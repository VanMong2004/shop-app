import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

const statusMap = {
  pending: {
    label: "Chờ xác nhận",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  },
  paid: {
    label: "Đã thanh toán",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
  shipping: {
    label: "Đang giao",
    color: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  },
  done: {
    label: "Hoàn thành",
    color: "text-green-400 bg-green-400/10 border-green-400/30",
  },
  cancelled: {
    label: "Đã hủy",
    color: "text-red-400 bg-red-400/10 border-red-400/30",
  },
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const status = statusMap[order.status];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Chi tiết đơn hàng</h1>
            <p className="text-slate-500 text-sm">#{order._id}</p>
          </div>
          <span
            className={`text-sm border px-3 py-1.5 rounded-full ${status.color}`}
          >
            {status.label}
          </span>
        </div>

        {/* Sản phẩm */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-5">
          <h2 className="font-bold mb-4">Sản phẩm đã đặt</h2>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-400">x{item.quantity}</p>
                </div>
                <p className="text-violet-300 font-bold">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-bold">
            <span>Tổng cộng</span>
            <span className="text-violet-300">
              {order.totalAmount.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="font-bold mb-4">Thông tin giao hàng</h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>
              {order.shippingAddress.address}, {order.shippingAddress.city}
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="block text-center bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}

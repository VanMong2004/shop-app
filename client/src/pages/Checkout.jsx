import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      setError("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const items = cart.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.images[0],
        price: item.price,
        quantity: item.quantity,
      }));

      const res = await axios.post("/orders", {
        items,
        totalAmount: totalPrice,
        shippingAddress: form,
        paymentMethod: "cod",
      });

      clearCart();
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Đặt hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form địa chỉ */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-5">Thông tin giao hàng</h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-5 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {[
                  {
                    name: "fullName",
                    label: "Họ tên",
                    placeholder: "Nguyễn Văn A",
                  },
                  {
                    name: "phone",
                    label: "Số điện thoại",
                    placeholder: "0901234567",
                  },
                  {
                    name: "address",
                    label: "Địa chỉ",
                    placeholder: "123 Đường ABC, Phường XYZ",
                  },
                  {
                    name: "city",
                    label: "Tỉnh / Thành phố",
                    placeholder: "Hồ Chí Minh",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-slate-300 text-sm mb-1.5 block">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Phương thức thanh toán</h2>
              <div className="flex items-center gap-3 bg-violet-600/10 border border-violet-500/30 rounded-xl px-4 py-3">
                <div className="w-4 h-4 rounded-full bg-violet-500" />
                <span className="text-sm">Thanh toán khi nhận hàng (COD)</span>
              </div>
            </div>
          </div>

          {/* Tóm tắt */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold mb-5">Đơn hàng</h2>

            <div className="space-y-3 mb-5">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-slate-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm text-violet-300 whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span className="text-violet-300">
                  {totalPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? "Đang đặt hàng..." : "Xác nhận đặt hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

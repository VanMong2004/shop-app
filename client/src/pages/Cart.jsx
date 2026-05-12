import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-5xl">🛒</p>
          <p className="text-slate-400 text-lg">Giỏ hàng trống</p>
          <Link
            to="/"
            className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-medium transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <p className="text-xs text-violet-400 mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-violet-300 font-bold mb-3">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="text-slate-400 hover:text-white transition"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="text-slate-400 hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-300 text-sm transition"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <p className="text-white font-bold whitespace-nowrap">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-slate-500 hover:text-red-400 transition"
            >
              Xóa tất cả
            </button>
          </div>

          {/* Tổng tiền */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold mb-6">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-slate-400"
                >
                  <span className="line-clamp-1 flex-1 mr-2">
                    {item.name} x{item.quantity}
                  </span>
                  <span>
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </span>
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
              onClick={() => navigate("/checkout")}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

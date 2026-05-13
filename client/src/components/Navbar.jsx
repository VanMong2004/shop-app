import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          Shop<span className="text-violet-400">App</span>
        </Link>

        <div className="flex items-center gap-4">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm text-violet-400 hover:text-violet-300 transition"
            >
              Quản lý
            </Link>
          )}
          <Link
            to="/cart"
            className="relative text-sm text-slate-300 hover:text-white transition"
          >
            Giỏ hàng
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Đơn hàng
          </Link>
          <span className="text-sm text-slate-400">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}

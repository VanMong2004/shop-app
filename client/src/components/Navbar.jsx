import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
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
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Giỏ hàng
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

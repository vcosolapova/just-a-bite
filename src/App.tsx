import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemList from "./pages/ItemList";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Configuracion from "./pages/Configuracion";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import CategoriesPage from "./pages/CategoriesPage";
import OffersPage from "./pages/OffersPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderFailurePage from "./pages/OrderFailurePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import LoginPage from "./pages/LoginPage";
import { isLoggedIn, getLoggedUser } from "./services/userService";
import LoginMobile from "./pages/LoginMobile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/variables.css";
import "./styles/global.css";
function PrivateRoute({ children }: { children: React.JSX.Element }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.JSX.Element }) {
  const user = getLoggedUser();
  if (!isLoggedIn()) return <Navigate to="/login" />;
  if (!user?.isAdmin) return <Navigate to="/" />;
  return children;
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/ofertas" element={<OffersPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/compra-exitosa" element={<OrderSuccessPage />} />
            <Route path="/compra-fallida" element={<OrderFailurePage />} />
            <Route path="/login-mobile" element={<LoginMobile />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route path="/configuracion" element={<Configuracion />} />

            <Route
              path="/admin/usuarios"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, ShoppingCart, Phone, Instagram, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantidade, 0);
    setCartCount(count);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const newCount = updatedCart.reduce((sum, item) => sum + item.quantidade, 0);
      setCartCount(newCount);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [location]);

  const navItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Sobre", path: createPageUrl("Sobre") },
    { name: "Catálogo", path: createPageUrl("Catalogo") },
    { name: "Formas", path: createPageUrl("Formas") },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-amber-50">
      <style>{`
        :root {
          --primary-pink: #FFB6C1;
          --light-pink: #FFE5EC;
          --gold: #D4AF37;
          --light-gold: #F4E4C1;
          --cream: #FFF8F0;
        }
        
        * {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">
                  Joãozinho & Maria
                </h1>
                <p className="text-xs text-gray-500 font-light tracking-wide">Doces Finos</p>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Cart Button */}
            <Link to={createPageUrl("Catalogo")} className="relative">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-pink-500" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center gap-2 pb-4 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md"
                    : "bg-pink-50 text-gray-600 hover:bg-pink-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5538999129150"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
      >
        <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></span>
      </a>

      {/* Premium Footer */}
      <footer className="relative mt-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-pink-500 to-amber-500">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Joãozinho & Maria</h3>
                  <p className="text-pink-100 text-sm">Doces Finos Artesanais</p>
                </div>
              </div>
              <p className="text-pink-50 leading-relaxed mb-6 max-w-md">
                Tradição e qualidade em cada doce. Transformando momentos especiais 
                em memórias doces desde 2020.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://wa.me/5538999129150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Phone className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="mailto:contato@docesfinosjoaozinhoemaria.com.br"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                Contato
              </h4>
              <ul className="space-y-4 text-pink-50">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium text-white">WhatsApp</p>
                    <p className="text-sm">(38) 99912-9150</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium text-white">E-mail</p>
                    <p className="text-sm break-all">contato@docesfinosjoaozinhoemaria.com.br</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                Horário
              </h4>
              <ul className="space-y-3 text-pink-50">
                <li className="flex justify-between items-center">
                  <span>Segunda - Sexta</span>
                  <span className="font-medium text-white">8h - 18h</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Sábado</span>
                  <span className="font-medium text-white">9h - 15h</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Domingo</span>
                  <span className="font-medium text-white">Fechado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-t border-white/20 pt-8 mb-8">
            <div className="flex flex-wrap justify-center gap-6 text-pink-50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-white transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-pink-50">
            <p className="text-sm text-center md:text-left">
              © 2024 Doces Finos Joãozinho & Maria. Todos os direitos reservados.
            </p>
            <p className="text-sm flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 text-pink-200 fill-pink-200 animate-pulse" /> e muito carinho
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
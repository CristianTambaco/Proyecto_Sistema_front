// frontend/src/pages/Home.jsx
import logoDogCatMain from '../assets/imagemain.png'
import logoDog from '../assets/imagehand.png'
import { Link } from 'react-router'
import { TbDog } from "react-icons/tb";
import { FaStar, FaUsers, FaUser } from "react-icons/fa";
import HorariosLanding from '../components/info/HorariosLanding';
import storeAuth from '../context/storeAuth';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import React from 'react';


export const Home = () => {
  const { token, rol } = storeAuth();

  const { fetchDataBackend } = useFetch();
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const HorariosLanding = React.lazy(() => import('../components/info/HorariosLanding'));

  useEffect(() => {
    const cargarServiciosPublicos = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/servicios-publicos?page=${currentPage}&limit=3`;
        const response = await fetchDataBackend(url, null, "GET", null);
        setServicios(response?.servicios || []);
        setTotalPages(response?.pagination?.pages || 1);
      } catch (error) {
        console.error("Error al cargar servicios públicos:", error);
      } finally {
        setLoadingServicios(false);
      }
    };
    cargarServiciosPublicos();
  }, [currentPage]);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <h1 className="font-extrabold text-2xl tracking-tight text-emerald-700">
            Estética<span className="text-sky-600">Canina</span>
          </h1>
          <nav aria-label="Navegación principal">
            <ul className="hidden md:flex gap-6 font-medium text-gray-700">
              <li><a href="#" className="hover:text-emerald-600 transition">Inicio</a></li>
              <li><a href="#about" className="hover:text-emerald-600 transition">Nosotros</a></li>
              <li><a href="#contact" className="hover:text-emerald-600 transition">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="pt-2 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="container mx-auto px-4 py-20 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="font-extrabold text-gray-900 text-4xl md:text-5xl lg:text-6xl leading-tight">
              CUIDADO <br /> Y BIENESTAR CANINO
            </h1>
            <p className="mt-6 text-lg text-gray-800 max-w-md mx-auto md:mx-0 leading-relaxed">
              Servicios especializados, atención personalizada, bienestar y mucho más…
            </p>
            {token ? (
              <Link
                to="/dashboard"
                className="inline-block mt-8 md:mt-10 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                aria-label="Ir al panel de control"
              >
                Ir al Panel
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block mt-8 md:mt-10 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Iniciar sesión"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
          <div className="order-1 md:order-2">
            <img
              src={logoDogCatMain}
              alt="Perro disfrutando de un baño en nuestra peluquería canina"
              className="w-full rounded-3xl shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </main>

      {/* SOBRE NOSOTROS */}
      <section id="about" className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sobre Nosotros</h2>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <img
              src={logoDog}
              alt="Nuestra peluquería canina: cuidado y bienestar para tu mascota"
              className="rounded-3xl shadow-xl w-full"
              loading="lazy"
            />
            <div>
              <p className="mb-8 text-lg text-gray-800 leading-relaxed">
                Nuestra peluquería canina es un espacio dedicado al cuidado, higiene y bienestar de tu mascota.
                Trabajamos con dedicación y cariño para ofrecer un servicio profesional que respete la comodidad, 
                salud y personalidad de cada mascota.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow transition">
                  <TbDog className="text-emerald-600 text-2xl mt-0.5" /> 
                  <span>Cuidado Integral para Mascotas</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow transition">
                  <FaStar className="text-sky-600 text-2xl mt-0.5" /> 
                  <span>Higiene y Bienestar</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow transition">
                  <FaUsers className="text-emerald-600 text-2xl mt-0.5" /> 
                  <span>Atención Personalizada</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow transition">
                  <FaUser className="text-sky-600 text-2xl mt-0.5" /> 
                  <span>Ambiente Seguro y Confiable</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow transition sm:col-span-2">
                  <FaStar className="text-yellow-500 text-2xl mt-0.5" /> 
                  <span>Profesionales Comprometidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS */}
      <section className="py-12 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Nuestros Servicios</h2>
          {loadingServicios ? (
            <div className="text-center py-4 text-gray-800">Cargando servicios...</div>
          ) : servicios.length === 0 ? (
            <div className="text-center py-4 text-gray-600">Próximamente disponibles.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicios.map((servicio) => (
                <div key={servicio._id} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
                  {servicio.imagen ? (
                    <img
                      src={servicio.imagen}
                      alt={servicio.nombre}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-600">Sin imagen</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">{servicio.nombre}</h3>
                  <p className="text-gray-800 mb-3">{servicio.descripcion}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold text-green-800">💲 ${servicio.precio}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {servicio.duracionEstimada} min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Controles de paginación */}
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Anterior
            </button>
            <span className="px-4 py-2 self-center text-gray-800">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>

      {/* HORARIOS DE ATENCIÓN */}
      <section id="horarios">
        <React.Suspense fallback={<div>Cargando horarios...</div>}>
          <HorariosLanding />
        </React.Suspense>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-8 px-4 mt-16">
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Nuestra Peluquería Canina</h3>
            <p className="leading-relaxed">Cuidado, bienestar y atención profesional para tu mascota. 🐾</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contacto</h3>
            <p>Tel: 0995644186</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Síguenos</h3>
            <div className="flex gap-4 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" aria-label="Síguenos en Facebook">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition" aria-label="Síguenos en Instagram">
                <FaInstagramSquare />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition" aria-label="Síguenos en X (Twitter)">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} - Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}
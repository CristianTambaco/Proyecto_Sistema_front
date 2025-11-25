// frontend/src/pages/Home.jsx
import logoDarkMode from '../assets/dark.png'
import logoDogCatMain from '../assets/imagemain.png'
import AppStoreImage from '../assets/appstore.png'
import GooglePlayImage from '../assets/googleplay.png'
import logoDog from '../assets/imagehand.png'
import { Link } from 'react-router'
import { MdDashboard } from "react-icons/md";
import { FaRobot, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { FaCommentSms } from "react-icons/fa6";
import { TbDog } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import HorariosLanding from '../components/info/HorariosLanding'; // <-- Importar el componente
import storeAuth from '../context/storeAuth'; // Importar storeAuth


import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';


export const Home = () => {
  const { token, rol } = storeAuth(); // Obtener el token y el rol



  const { fetchDataBackend } = useFetch();
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  useEffect(() => {
        const cargarServiciosPublicos = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/servicios-publicos?page=${currentPage}&limit=3`; //por defecto 3 servicios se muestran
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
        <div className="container mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="font-extrabold text-2xl tracking-tight text-emerald-700">
            Estética<span className="text-sky-600">Canina</span>
          </h1>
          <nav>
            <ul className="hidden md:flex gap-10 font-medium text-gray-700">
              <li><a href="#" className="hover:text-emerald-600 transition">Inicio</a></li>
              <li><a href="#about" className="hover:text-emerald-600 transition">Nosotros</a></li>

              {/* enlace a horarios */}
              {/* <li><a href="#horarios" className="hover:text-emerald-600 transition">Horarios</a></li>  */}

              <li><a href="#contact" className="hover:text-emerald-600 transition">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="pt-2 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="container mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="font-extrabold text-gray-900 text-4xl md:text-6xl leading-tight">
              CUIDADO <br /> Y BIENESTAR CANINO
            </h1>
            
            {/* <p className="mt-6 text-lg font-extrabold text-gray-900 max-w-md mx-auto md:mx-0 leading-tight">
              Inspirando confianza a través del cuidado profesional
            </p> */}

            <p className="mt-6 text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">
              Servicios especializados, atención personalizada, bienestar y mucho más…
            </p>
            {/* Botón condicional */}
            {token ? (
              <Link
                to="/dashboard"
                className="inline-block mt-10 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
              >
                Ir al Panel
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block mt-10 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
          <div className="order-1 md:order-2">
            <img src={logoDogCatMain} alt="Mascotas" className="w-full rounded-3xl shadow-2xl" />
          </div>
        </div>
      </main>

      {/* SOBRE NOSOTROS */}
      <section id="about" className="bg-gray-50 py-0 px-0">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sobre Nosotros</h2>
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <img src={logoDog} alt="Sobre nosotros" className="rounded-3xl shadow-xl" />
            <div>
              <p className="mb-10 text-lg text-gray-600 leading-relaxed">
                Nuestra peluquería canina es un espacio dedicado al cuidado, higiene y bienestar de tu mascota.
                Trabajamos con dedicación y cariño para ofrecer un servicio profesional que respete la comodidad, 
                salud y personalidad de cada mascota.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow  transition">
                  <TbDog className="text-emerald-600 text-2xl" /> Cuidado Integral para Mascotas
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow  transition">
                  <FaStar className="text-sky-600 text-2xl" /> Higiene y Bienestar
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow  transition">
                  <FaUsers className="text-emerald-600 text-2xl" /> Atención Personalizada
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow  transition">
                  <FaUser className="text-sky-600 text-2xl" /> Ambiente Seguro y Confiable
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow  transition sm:col-span-2">
                  <FaStar className="text-yellow-500 text-2xl" /> Profesionales Comprometidos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


            {/* SECCIÓN DE SERVICIOS */}
            <section className="py-12 bg-white">
              <div className="container mx-auto px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestros Servicios</h2>
                {loadingServicios ? (
                  <div className="text-center py-4">Cargando servicios...</div>
                ) : servicios.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">Próximamente disponibles.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicios.map((servicio) => (
                      <div
                        key={servicio._id}
                        className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-xl font-bold text-emerald-600 mb-2">{servicio.nombre}</h3>
                        <p className="text-gray-700 mb-3">{servicio.descripcion}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-semibold text-green-700">💲 ${servicio.precio}</span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {servicio.duracionEstimada} min
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}


                {/* Controles de paginación */}
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
      >
        Anterior
      </button>
      <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
      >
        Siguiente
      </button>
    </div>




              </div>
            </section>




            




      {/* HORARIOS DE ATENCIÓN */}
      <section id="horarios">
        <HorariosLanding />
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-6 px-8 mt-20">
        <div className="container mx-auto grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Nuestra Peluquería Canina</h3>
            <p className="leading-relaxed">Cuidado, bienestar y atención profesional para tu mascota. 🐾</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contacto</h3>
            {/* <p>Email: admin@hotmail.com</p> */}
            <p>Tel: 0995644186</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Síguenos</h3>
            <div className="flex gap-6 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><FaSquareInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition"><FaXTwitter /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 text-sm text-gray-500 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} - Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}
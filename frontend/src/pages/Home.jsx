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


export const Home = () => {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="font-extrabold text-2xl tracking-tight text-emerald-700">
            Pet<span className="text-sky-600">ManageQ</span>
          </h1>
          <nav>
            <ul className="hidden md:flex gap-10 font-medium text-gray-700">
              <li><a href="#" className="hover:text-emerald-600 transition">Inicio</a></li>
              <li><a href="#about" className="hover:text-emerald-600 transition">Nosotros</a></li>
              
              <li><a href="#contact" className="hover:text-emerald-600 transition">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="pt-32 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="container mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="font-extrabold text-gray-900 text-4xl md:text-6xl leading-tight">
              Gestión Inteligente <br /> para tu Peluquería Canina
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">
              Moderniza tu negocio con un panel administrativo intuitivo y un control total de tus servicios.
            </p>
            <Link
              to="/login"
              className="inline-block mt-10 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
            >
              Empezar ahora
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <img src={logoDogCatMain} alt="Mascotas" className="w-full rounded-3xl shadow-2xl" />
          </div>
        </div>
      </main>

      {/* SOBRE NOSOTROS */}
      <section id="about" className="bg-gray-50 py-24 px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Sobre Nosotros</h2>
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <img src={logoDog} alt="Sobre nosotros" className="rounded-3xl shadow-xl" />
            <div>
              <p className="mb-10 text-lg text-gray-600 leading-relaxed">
                <b>PetManageQ</b> es la plataforma que transforma la gestión de tu peluquería canina,
                brindando control centralizado y herramientas fáciles de usar.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <MdDashboard className="text-emerald-600 text-2xl" /> Panel administrativo
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <BsCashCoin className="text-sky-600 text-2xl" /> Pagos en línea
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <FaUsers className="text-emerald-600 text-2xl" /> Gestión de clientes
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <FaUser className="text-sky-600 text-2xl" /> Gestión de perfil
                </div>
                <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition sm:col-span-2">
                  <FaStar className="text-yellow-500 text-2xl" /> Historial de atenciones de la mascota
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services" className="py-24 px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Funcionalidades</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaUser className="text-4xl text-emerald-600" />, title: "Gestión de perfil" },
              { icon: <FaUsers className="text-4xl text-sky-600" />, title: "Gestión de clientes" },
              { icon: <FaStar className="text-4xl text-yellow-500" />, title: "Gestión de historial de atenciones de la mascota" },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-md p-10 text-center hover:shadow-xl hover:scale-105 border border-transparent hover:border-emerald-300 transition"
              >
                {service.icon}
                <h4 className="text-xl font-bold mt-6 text-gray-900">{service.title}</h4>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  Optimiza la gestión, haz crecer tu negocio con un sistema práctico y moderno.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="container mx-auto grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">PetManageQ</h3>
            <p className="leading-relaxed">La gestión inteligente tu peluquería canina 🐾</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contacto</h3>
            <p>Email: admin@PetManageQ.com</p>
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
          © {new Date().getFullYear()} PetManageQ - Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}

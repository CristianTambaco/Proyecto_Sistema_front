import logoDarkMode from '../assets/dark.png'
import logoDogCatMain from '../assets/imagemain.png'
import AppStoreImage from '../assets/appstore.png'
import GooglePlayImage from '../assets/googleplay.png'
import logoDog from '../assets/imagehand.png'
import { Link } from 'react-router'
import { MdDashboard } from "react-icons/md";
import { FaRobot, FaUser, FaUsers } from "react-icons/fa";
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
      <header className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="font-extrabold text-3xl text-sky-600">
          Pet<span className="text-emerald-500">ManageQ</span>
        </h1>
        <nav>
          <ul className="hidden md:flex gap-6 font-semibold text-gray-600">
            <li><a href="#" className="hover:text-sky-600 transition">Inicio</a></li>
            <li><a href="#about" className="hover:text-sky-600 transition">Nosotros</a></li>
            <li><a href="#services" className="hover:text-sky-600 transition">Servicios</a></li>
            <li><a href="#contact" className="hover:text-sky-600 transition">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <main className="bg-gradient-to-r from-sky-50 to-emerald-50 py-20 px-6 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="font-extrabold text-sky-700 text-4xl md:text-6xl leading-tight">
            Gestión Inteligente <br /> para Peluquerías Caninas
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Optimiza tus servicios con Panel Administrativo, pagos en línea y comunicación en tiempo real.
          </p>
          <Link
            to="/login"
            className="inline-block mt-8 bg-sky-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-sky-700 transition"
          >
            Empezar ahora
          </Link>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src={logoDogCatMain} alt="Mascotas" className="w-full drop-shadow-lg" />
        </div>
      </main>

      {/* SOBRE NOSOTROS */}
      <section id="about" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-12">Sobre Nosotros</h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img src={logoDog} alt="Sobre nosotros" className="rounded-2xl shadow-xl" />
          </div>
          <div className="md:w-1/2 text-gray-700">
            <p className="mb-6 text-lg">
              <b>PetManageQ</b> es la plataforma que moderniza la gestión de peluquerías caninas en Quito.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><MdDashboard className="text-sky-600 text-xl" /> Panel administrativo</li>              
              <li className="flex items-center gap-2"><BsCashCoin className="text-sky-600 text-xl" /> Pagos en línea</li>
              {/* <li className="flex items-center gap-2"><FaCommentSms className="text-sky-600 text-xl" /> Chat en tiempo real</li> */}
              <li className="flex items-center gap-2"><FaUsers className="text-sky-600 text-xl" /> Gestión de clientes</li>
              <li className="flex items-center gap-2"><FaUser className="text-sky-600 text-xl" /> Gestión de estilistas</li>
              <li className="flex items-center gap-2"><GiMedicines className="text-sky-600 text-xl" /> Tratamientos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services" className="bg-sky-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-12">Nuestros Servicios</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <FaUser className="text-4xl text-emerald-600" />, title: "Gestión de Estilistas" },
            { icon: <FaUsers className="text-4xl text-emerald-600" />, title: "Gestión de Clientes" },
            { icon: <GiMedicines className="text-4xl text-emerald-600" />, title: "Gestión de Tratamientos" },
            // { icon: <FaCommentSms className="text-4xl text-emerald-600" />, title: "Chat en Tiempo Real" },
          ].map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300">
              {service.icon}
              <h4 className="text-xl font-bold mt-4 text-gray-800">{service.title}</h4>
              <p className="mt-2 text-gray-600 text-sm">
                Simplifica y mejora la experiencia de tus clientes con nuestras herramientas inteligentes.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gradient-to-r from-sky-700 to-emerald-600 text-white py-12 px-6 mt-16">
        <div className="container mx-auto grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4">PetManageQ</h3>
            <p>La gestión inteligente para peluquerías caninas en Quito 🐾</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p>Email: admin@PetManageQ.com</p>
            <p>Tel: 0995644186</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4 text-2xl">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition"
              >
                <FaSquareInstagram />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-300 transition"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-sm text-gray-200">
          © {new Date().getFullYear()} PetManageQ - Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}
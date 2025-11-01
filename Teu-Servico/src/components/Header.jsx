import { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img
          alt="Logo Teu Serviço"
          src="/teuServicoLogo.png"
          className="h-22 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <nav className="hidden md:flex space-x-12 items-center">
          <Link to="/create-account?type=profissional" className="text-[#002C57] hover:text-[#F69027]">
            Eu quero Trabalhar
          </Link>
          <a href="#" className="text-[#002C57] hover:text-[#F69027]">
            O que fazemos
          </a>
          <Link to="/buscar" className="text-[#002C57] hover:text-[#F69027]">
            Encontrar Profissionais
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to={"/edit-profile"}>
                <FaUserCircle className="h-8 w-8 text-[#f69027]" />
              </Link>
              <span className="text-[#002C57]">{user?.name}</span>
              <button
                onClick={logout}
                className="text-[#002C57] hover:text-[#F69027]"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#002C57] hover:text-[#F69027]"
              >
                Login
              </Link>
              <Link
                to="/create-account?type=cliente"
                className="bg-[#F69027] text-[#002C57] px-4 py-2 rounded-md hover:bg-[#d96c15] transition"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FiMenu className="h-6 w-6 text-gray-800" strokeWidth={3} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col items-center space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/edit-profile"
                  className="hover:text-gray-400 text-center"
                  style={{ color: "#002C57" }}
                >
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-gray-400 text-center"
                  style={{ color: "#F69027" }}
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-400 text-center"
                  style={{ color: "#002C57" }}
                >
                  Login
                </Link>
                <Link
                  to="/create-account?type=cliente"
                  className="hover:text-gray-400 text-center"
                  style={{ color: "#F69027" }}
                >
                  Cadastre-se
                </Link>
              </>
            )}
            <a
              href="#"
              className="hover:text-gray-400 text-center"
              style={{ color: "#002C57" }}
            >
              O que fazemos
            </a>
            <Link
              to="/create-account?type=profissional"
              className="hover:text-gray-400 text-center"
              style={{ color: "#002C57" }}
            >
              Eu quero Trabalhar
            </Link>
            <Link
              to="/buscar"
              className="hover:text-gray-400 text-center"
              style={{ color: "#002C57" }}
            >
              Encontrar Profissionais
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

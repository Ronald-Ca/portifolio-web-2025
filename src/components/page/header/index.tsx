import { useState } from 'react';
import { FaAddressCard, FaHouseUser, FaGamepad, FaStar, FaBars, FaTimes } from 'react-icons/fa';
import { PiProjectorScreenChartFill } from 'react-icons/pi';
import { MdOutlineContactMail } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@app/components/ui/tooltip';
import newLogo from '@app/public/logo.png';

export default function Header() {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', icon: <FaHouseUser />, text: 'Início' },
    { path: '/about', icon: <FaAddressCard />, text: 'Sobre' },
    { path: '/skills', icon: <FaGamepad />, text: 'Skills' },
    { path: '/projects', icon: <PiProjectorScreenChartFill />, text: 'Projetos' },
  ]

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="w-full bg-gradient-to-r from-slate-900 to-slate-800 px-3 md:px-8 py-2 md:py-4 border-b border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between lg:hidden">
        <img
          src={newLogo}
          alt='Ronald - Desenvolvedor Full Stack'
          className='h-12 w-auto max-w-[170px] object-contain cursor-pointer'
          onClick={() => handleNavigate('/')}
        />
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-600 text-default hover:bg-slate-800/80 transition-colors"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
        >
          {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 rounded-lg border border-slate-700 bg-slate-900/95 p-3">
          <nav className="grid grid-cols-2 gap-2 mb-3">
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `h-10 px-3 flex items-center justify-center gap-2 rounded-md border transition-all duration-200 ${
                    isActive
                      ? 'text-default border-default bg-default/10'
                      : 'text-gray-200 border-slate-700 hover:border-default/50 hover:text-default'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </NavLink>
            ))}
          </nav>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className="h-10 flex items-center justify-center rounded-md bg-default border border-default text-white"
              onClick={() => handleNavigate('/thanks')}
            >
              <FaStar />
            </button>
            <button
              type="button"
              className="h-10 px-3 flex items-center justify-center gap-2 rounded-md border border-slate-700 text-gray-200 hover:text-default"
              onClick={() => handleNavigate('/contact')}
            >
              <MdOutlineContactMail className="text-default" />
              <span className="text-sm">Contato</span>
            </button>
            <button
              type="button"
              className="h-10 px-3 flex items-center justify-center gap-2 rounded-md border border-default text-gray-200 hover:bg-default/20"
              onClick={() => handleNavigate('/login')}
            >
              <IoMdLogIn className="text-default" />
              <span className="text-sm">Login</span>
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
        <img
          src={newLogo}
          alt='Ronald - Desenvolvedor Full Stack'
          className='h-20 -my-3 w-auto max-w-[320px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300'
          onClick={() => navigate('/')}
        />

        <nav className="w-full md:w-auto flex justify-center md:justify-start gap-2 md:gap-4 overflow-x-auto pb-1 md:pb-0">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `relative min-w-20 sm:min-w-24 md:w-24 lg:w-28 h-10 px-2 md:px-1 lg:px-0 flex justify-center items-center gap-2 
               rounded-lg transition-all duration-300 cursor-pointer
               before:absolute before:bottom-0 before:left-0 before:w-full 
               before:h-1 before:bg-default before:rounded-lg 
               before:transition-transform before:duration-300
               ${isActive
                ? 'text-default before:scale-x-100 before:origin-bottom-left'
                : `text-gray-200 before:scale-x-0 before:origin-bottom-right 
                  hover:text-default hover:before:scale-x-100 hover:before:origin-bottom-left`
              }
              `
            }
          >
            <span className="text-default hover:scale-110 transition-transform">{item.icon}</span>
            <span className="hidden lg:inline font-medium tracking-wide">{item.text}</span>
          </NavLink>
        ))}
        </nav>

        <div className="w-full md:w-auto flex justify-center md:justify-end gap-2 sm:gap-3 md:gap-4 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="
                  flex h-10 w-10 shrink-0 items-center justify-center bg-default 
                  rounded-lg border border-default shadow-lg cursor-pointer 
                  transition-all duration-300 hover:scale-110 neon-pulse"
                  onClick={() => navigate('/thanks')}
                  style={{ zIndex: 1 }}
                >
                  <FaStar className="text-white text-base" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                Agradecimentos
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div
            className="
            flex h-10 items-center gap-2 px-3 sm:px-4 md:px-6 bg-slate-800/50 
            rounded-lg text-gray-200 border border-slate-600 
            transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/contact')}
          >
            <MdOutlineContactMail className="text-default animate-pulse" />
            <span className="hidden lg:inline">Contato</span>
          </div>
          <div
            className="
            flex h-10 items-center gap-2 px-3 sm:px-4 md:px-6 bg-default/10 
            rounded-lg text-gray-200 border border-default 
            hover:bg-default/20 transition-all duration-300 
            group cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <IoMdLogIn className="text-default group-hover:translate-x-1 transition-transform" />
            <span className="hidden lg:inline">Login</span>
          </div>
        </div>
      </div>
    </header>
  )
}
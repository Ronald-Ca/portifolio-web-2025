import { FaAddressCard, FaHouseUser, FaGamepad, FaStar } from 'react-icons/fa';
import { PiProjectorScreenChartFill } from 'react-icons/pi';
import { MdOutlineContactMail } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@app/components/ui/tooltip';
import newLogo from '@app/public/logo.png';

export default function Header() {
  const navigate = useNavigate()

  const menuItems = [
    { path: '/', icon: <FaHouseUser />, text: 'Início' },
    { path: '/about', icon: <FaAddressCard />, text: 'Sobre' },
    { path: '/skills', icon: <FaGamepad />, text: 'Skills' },
    { path: '/projects', icon: <PiProjectorScreenChartFill />, text: 'Projetos' },
  ]

  return (
    <header className="
      w-full flex justify-between items-center overflow-visible
      bg-gradient-to-r from-slate-900 to-slate-800
      px-8 py-4 border-b border-slate-700 fixed top-0 z-40"
    >

      <img 
        src={newLogo} 
        alt='Ronald - Desenvolvedor Full Stack' 
        className='h-20 -my-3 w-auto max-w-[320px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300'
        onClick={() => navigate('/')}
      />

      <nav className="flex gap-4">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `relative w-28 h-10 flex justify-center items-center gap-2 
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
            <span className="font-medium tracking-wide">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex gap-4 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="
                flex items-center justify-center w-11 h-11 bg-default 
                rounded-lg border border-default shadow-lg cursor-pointer 
                transition-all duration-300 hover:scale-110 neon-pulse"
                onClick={() => navigate('/thanks')}
                style={{ zIndex: 1 }}
              >
                <FaStar className="text-white text-xl" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              Agradecimentos
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          className="
          px-6 py-2 flex items-center gap-2 bg-slate-800/50 
          rounded-lg text-gray-200 border border-slate-600 
          transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/contact')}
        >
          <MdOutlineContactMail className="text-default animate-pulse" />
          Contato
        </div>
        <div
          className="
          px-6 py-2 flex items-center gap-2 bg-default/10 
          rounded-lg text-gray-200 border border-default 
          hover:bg-default/20 transition-all duration-300 
          group cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <IoMdLogIn className="text-default group-hover:translate-x-1 transition-transform" />
          Login
        </div>
      </div>
    </header>
  )
}
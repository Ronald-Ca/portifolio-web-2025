import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { FaBirthdayCake, FaHome } from 'react-icons/fa'
import { Separator } from '@radix-ui/react-select'
import { Card, CardHeader, CardContent } from '@app/components/ui/card'
import React from 'react'
import { AboutType } from '@app/services/about-service'
import { CurriculumType } from '@app/services/curriculum-service'
import { ButtonCurriculum } from '@app/components/common/button-curriculum'

interface ProfileProps {
  about: AboutType;
  curriculum: CurriculumType;
}

export const Profile: React.FC<ProfileProps> = ({ about, curriculum }) => (
  <Card className="bg-slate-900/50 border-cyan-500/50 text-white">
    <CardHeader className="text-center relative">
      <div className="flex justify-center mb-6">
        <div className="border-4 border-cyan-500 p-2 rounded-full shadow-lg shadow-cyan-500/20">
          <Avatar className="w-40 h-40">
            <AvatarImage
              src={about.image?.toString() || "/placeholder.svg"}
              alt="Foto de perfil"
              className="rounded-full w-96 h-96 object-cover"
            />
          </Avatar>
        </div>
        <div className='absolute top-0 right-0 mt-4 mr-4'>
          <ButtonCurriculum id={curriculum?.id} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-cyan-400">{about.name}</h2>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4 justify-between bg-slate-800/50 p-6 rounded-lg">
        <div className='w-full'>
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Sobre mim</h3>
          <p className="text-gray-300 leading-relaxed">
            Sou um desenvolvedor apaixonado por criar soluções inovadoras e eficientes. Com experiência em
            desenvolvimento web full stack, estou sempre em busca de novos desafios e aprendizados na área de
            tecnologia.
          </p>
        </div>
        <div className="flex gap-4 items-center md:items-start">
          <div className="flex items-center gap-3 text-lg">
            <BsFillPersonVcardFill className="text-cyan-400" size={24} />
            <span>Desenvolvedor Full Stack</span>
          </div>
          <Separator className="h-8 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-3 text-lg">
            <FaBirthdayCake className="text-cyan-400" size={24} />
            <span>{about.age != null ? `${about.age} anos` : (about.birthDate ? `${Math.floor((Date.now() - new Date(about.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} anos` : '')}</span>
          </div>
          <Separator className="h-8 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-3 text-lg">
            <FaHome className="text-cyan-400" size={24} />
            <span>
              {about.city} - {about.state}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

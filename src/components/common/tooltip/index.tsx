import { memo, type ReactElement, useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import type { IconType } from "react-icons"
import { motion } from "framer-motion"

interface TechIconProps {
    label: string
    Icon: IconType
}

interface DynamicTechIconProps {
    label: string
    icon: ReactElement
}

export const TechIcon = memo(function TechIcon({ label, Icon }: TechIconProps) {
    const [open, setOpen] = useState(false)
    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
                <motion.button
                    type="button"
                    className="
                    p-3.5 rounded-xl
                    bg-gradient-to-br from-bg_component/90 to-bg_component/70
                    backdrop-blur-sm
                    text-default
                    shadow-lg shadow-default/10
                    border border-white/10
                    hover:border-default/50
                    hover:text-white
                    hover:scale-110
                    cursor-pointer
                    transition-all duration-300 ease-out
                    "
                    whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpen(prev => !prev)}
                >
                    <Icon size={30} />
                </motion.button>
            </TooltipTrigger>

            <TooltipContent
                side="top"
                align="center"
                sideOffset={5}
                className="
                bg-gradient-to-r from-default to-cyan-500
                px-3 py-1.5 rounded-md
                text-slate-950 font-medium text-sm
                shadow-lg
                border border-white/10
                z-50
                "
            >
                <p>{label}</p>
                <div
                    className="
                    absolute -bottom-1.5 left-1/2 -translate-x-1/2
                    w-3 h-3 rotate-45
                    bg-default
                    "
                ></div>
            </TooltipContent>
        </Tooltip>
    )
})

export const DynamicTechIcon = memo(function DynamicTechIcon({ label, icon }: DynamicTechIconProps) {
    const [open, setOpen] = useState(false)
    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
                <motion.button
                    type="button"
                    className="
                    p-3.5 rounded-xl
                    bg-gradient-to-br from-bg_component/90 to-bg_component/70
                    backdrop-blur-sm
                    shadow-lg shadow-default/10
                    border border-white/10
                    hover:border-default/50
                    hover:scale-110
                    cursor-pointer
                    transition-all duration-300 ease-out
                    "
                    whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpen(prev => !prev)}
                >
                    {icon}
                </motion.button>
            </TooltipTrigger>

            <TooltipContent
                side="top"
                align="center"
                sideOffset={5}
                className="
                bg-gradient-to-r from-default to-cyan-500
                px-3 py-1.5 rounded-md
                text-slate-950 font-medium text-sm
                shadow-lg
                border border-white/10
                z-50
                "
            >
                <p>{label}</p>
                <div
                    className="
                    absolute -bottom-1.5 left-1/2 -translate-x-1/2
                    w-3 h-3 rotate-45
                    bg-default
                    "
                ></div>
            </TooltipContent>
        </Tooltip>
    )
})

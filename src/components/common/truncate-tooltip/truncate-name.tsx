import type React from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { cn } from "@app/lib/utils"

export function truncateName(name: string, maxLength: number): string {
    if (name.length <= maxLength) {
        return name
    }
    return name.slice(0, maxLength) + "..."
}

interface TruncatedNameProps {
    name: string
    maxLength: number
    className?: string
    tooltipSide?: "top" | "right" | "bottom" | "left"
    tooltipAlign?: "start" | "center" | "end"
    showIcon?: boolean
    /** Uma linha com reticências conforme o espaço (CSS); ignora maxLength no texto exibido */
    cssTruncate?: boolean
}

export const TruncatedName: React.FC<TruncatedNameProps> = ({
    name,
    maxLength,
    className,
    tooltipSide = "top",
    tooltipAlign = "center",
    showIcon = true,
    cssTruncate = false,
}) => {
    const truncated = cssTruncate ? name : truncateName(name, maxLength)
    const isCharTruncated = !cssTruncate && truncated !== name
    const showTooltip = name.length > 0 && (cssTruncate || isCharTruncated)

    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <span
                        className={cn(
                            cssTruncate
                                ? "block min-w-0 max-w-full truncate"
                                : "inline-flex items-center gap-1 relative",
                            showTooltip && "cursor-help",
                            className
                        )}
                    >
                        {cssTruncate ? name : truncated}
                        {isCharTruncated && showIcon && (
                            <span className="inline-flex w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-70" />
                        )}
                    </span>
                </TooltipTrigger>
                {showTooltip && (
                    <TooltipContent
                        side={tooltipSide}
                        align={tooltipAlign}
                        className="bg-gradient-to-br from-[#0c1a2c] to-[#070b14] border border-cyan-500/20 text-gray-100 px-4 py-2.5 rounded-lg shadow-lg shadow-cyan-500/10 max-w-xs z-50"
                        sideOffset={5}
                    >
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                            <div className="font-medium text-cyan-400 mb-1 text-sm">Nome completo:</div>
                            <div className="text-gray-100 break-words">{name}</div>
                        </motion.div>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )
}

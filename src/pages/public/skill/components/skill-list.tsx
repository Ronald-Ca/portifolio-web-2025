import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SkillCard from './skill-card'
import { SkillsListProps } from '../interfaces/ISkills'
import Pagination from '@app/components/common/pagination'

const ITEMS_PER_PAGE = 9

export default function SkillsList({ skills, filter, variants }: SkillsListProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(() => skills.filter(s => s.type === filter), [skills, filter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))

    useEffect(() => {
        setCurrentPage(1)
    }, [filter, skills])

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages)
    }, [currentPage, totalPages])

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filtered.slice(start, start + ITEMS_PER_PAGE)
    }, [filtered, currentPage])

    return (
        <>
            <motion.div
                variants={variants.container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto"
            >
                {filtered.length > 0 ? (
                    paginated.map(s => (
                        <SkillCard
                            key={s.id ?? s.name}
                            skill={s}
                            variants={{ item: variants.item }}
                        />
                    ))
                ) : (
                    <p className="text-white text-xl font-medium col-span-full text-center py-12">
                        Nenhuma {filter} cadastrada.
                    </p>
                )}
            </motion.div>

            {filtered.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </>
    )
}
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const DOTS = 'dots' as const

function getPageNumbers(current: number, total: number): (number | typeof DOTS)[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1)
	}
	const pages: (number | typeof DOTS)[] = [1]
	const left = Math.max(2, current - 1)
	const right = Math.min(total - 1, current + 1)
	if (left > 2) pages.push(DOTS)
	for (let p = left; p <= right; p++) pages.push(p)
	if (right < total - 1) pages.push(DOTS)
	pages.push(total)
	return pages
}

export interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	className?: string
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
	if (totalPages <= 1) return null

	const pages = getPageNumbers(currentPage, totalPages)

	return (
		<nav
			className={`flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-10 ${className}`}
			aria-label="Paginação"
		>
			<button
				type="button"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage <= 1}
				className="
					flex h-9 w-9 items-center justify-center rounded-md border border-default/50
					text-default bg-slate-900/60 transition-colors
					disabled:opacity-40 disabled:pointer-events-none
					hover:bg-default/10 hover:border-default
				"
				aria-label="Página anterior"
			>
				<IoChevronBack className="text-lg" />
			</button>

			{pages.map((p, i) =>
				p === DOTS ? (
					<span key={`dots-${i}`} className="px-2 text-gray-500 select-none">
						…
					</span>
				) : (
					<button
						key={p}
						type="button"
						onClick={() => onPageChange(p)}
						className={`
							min-w-[2.25rem] h-9 rounded-md border px-2 text-sm font-semibold transition-colors
							${p === currentPage
								? 'border-default bg-default text-slate-950 shadow-sm shadow-default/20'
								: 'border-default/40 text-gray-200 bg-slate-900/60 hover:bg-default/10 hover:border-default'}
						`}
						aria-current={p === currentPage ? 'page' : undefined}
						aria-label={`Ir para página ${p}`}
					>
						{p}
					</button>
				)
			)}

			<button
				type="button"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className="
					flex h-9 w-9 items-center justify-center rounded-md border border-default/50
					text-default bg-slate-900/60 transition-colors
					disabled:opacity-40 disabled:pointer-events-none
					hover:bg-default/10 hover:border-default
				"
				aria-label="Próxima página"
			>
				<IoChevronForward className="text-lg" />
			</button>
		</nav>
	)
}

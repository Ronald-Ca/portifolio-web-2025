import { useGetSkillsQuery } from '@app/queries/skill'
import { Button } from '@app/components/ui/button'
import { Badge } from '@app/components/ui/badge'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@app/components/ui/dropdown-menu'
import { ScrollArea } from '@app/components/ui/scroll-area'
import { FaSpinner } from 'react-icons/fa'

export interface SkillsMultiSelectProps {
	value: string[]
	onChange: (value: string[]) => void
	label?: string
	placeholder?: string
	dropdownLabel?: string
	showCreateButton?: boolean
	onCreateClick?: () => void
	disabled?: boolean
	className?: string
}

export function SkillsMultiSelect({
	value,
	onChange,
	label = 'Stacks',
	placeholder = 'Selecionar stacks',
	dropdownLabel = 'Stacks',
	showCreateButton = false,
	onCreateClick,
	disabled = false,
	className,
}: SkillsMultiSelectProps) {
	const { data: skills, isLoading } = useGetSkillsQuery()
	const selectedIds = Array.isArray(value) ? value.filter((id): id is string => !!id) : []

	const getSkillName = (skillId: string) => {
		const skill = skills?.find((s) => s.id === skillId)
		return skill?.name || skillId
	}

	const handleSkillChange = (skillId: string, checked: boolean) => {
		const newValue = checked
			? [...selectedIds, skillId]
			: selectedIds.filter((id) => id !== skillId)
		onChange(newValue)
	}

	const removeSkill = (skillId: string) => {
		onChange(selectedIds.filter((id) => id !== skillId))
	}

	return (
		<div className={className}>
			{(label || (showCreateButton && onCreateClick)) && (
				<div className="flex items-center justify-between gap-2 mb-2">
					{label ? <span className="text-gray-300 font-medium">{label}</span> : <span />}
					{showCreateButton && onCreateClick && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="bg-[#070b14] border-[#1e2a4a] text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
							onClick={onCreateClick}
						>
							Criar habilidade
						</Button>
					)}
				</div>
			)}
			<div className="flex flex-col gap-3">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="outline"
							disabled={disabled}
							className="w-full bg-[#070b14] border border-[#1e2a4a] text-gray-100 justify-between rounded-md"
						>
							{selectedIds.length > 0
								? `${selectedIds.length} stack${selectedIds.length > 1 ? 's' : ''} selecionada${selectedIds.length > 1 ? 's' : ''}`
								: placeholder}
							<span className="text-gray-400">▼</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[300px] bg-[#0c1220] border border-[#1e2a4a] text-gray-100 rounded-md"
					>
						<DropdownMenuLabel className="text-cyan-400 font-medium pb-2">
							{dropdownLabel}
						</DropdownMenuLabel>
						<ScrollArea className="h-[200px] w-full rounded-md border-0">
							{isLoading ? (
								<div className="flex justify-center items-center h-20">
									<FaSpinner className="animate-spin text-cyan-500" />
								</div>
							) : (
								skills?.map((skill) => {
									if (!skill.id) return null
									const checked = selectedIds.includes(skill.id)
									return (
										<DropdownMenuCheckboxItem
											key={skill.id}
											checked={checked}
											className="focus:bg-cyan-500/20 focus:text-cyan-50 cursor-pointer"
											onSelect={(e) => e.preventDefault()}
											onCheckedChange={(isChecked) => {
												handleSkillChange(skill.id!, isChecked)
											}}
										>
											{skill.name}
										</DropdownMenuCheckboxItem>
									)
								})
							)}
						</ScrollArea>
					</DropdownMenuContent>
				</DropdownMenu>
				{selectedIds.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-2">
						{selectedIds.map((skillId) => (
							<Badge
								key={skillId}
								variant="outline"
								className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 pl-2 pr-1 py-1"
							>
								{getSkillName(skillId)}
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-cyan-100"
									onClick={(e) => {
										e.preventDefault()
										removeSkill(skillId)
									}}
								>
									×
								</Button>
							</Badge>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

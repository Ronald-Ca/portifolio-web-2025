import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, checked, onCheckedChange, ...props }, ref) => (
		<input
			type="checkbox"
			ref={ref}
			checked={checked}
			onChange={(e) => onCheckedChange?.(e.target.checked)}
			className={cn(
				'h-4 w-4 shrink-0 rounded border border-[#1e2a4a] bg-[#070b14] text-cyan-500',
				'focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-offset-[#070b14]',
				'accent-cyan-500 cursor-pointer',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	)
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }

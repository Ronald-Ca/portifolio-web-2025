export default function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center bg-slate-800 min-h-screen h-screen w-full fixed inset-0">
			<div className="w-16 h-16 border-4 border-default border-dotted rounded-full animate-spin"></div>
		</div>
	)
}

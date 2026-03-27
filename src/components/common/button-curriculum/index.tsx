import { Button } from '../../../components/ui/button'
import CurriculumService from '../../../services/curriculum-service'
import { FiDownload } from 'react-icons/fi'

interface ButtonCurriculumProps {
	id?: string
}

export function ButtonCurriculum({ id }: ButtonCurriculumProps) {
	const curriculumService = new CurriculumService()

	const downloadCurriculum = async () => {
		if (id) {
			const base64 = await curriculumService.downloadCurriculum(id)
			const link = document.createElement('a')
			link.href = base64
			link.download = 'curriculo.pdf'
			link.click()
		}
	}

	return (
		<Button
			onClick={downloadCurriculum}
			className='w-full sm:w-[240px] bg-default text-slate-950 border border-default shadow-lg shadow-default/20 hover:bg-default/90 flex gap-2 font-bold justify-center'
		>
			DOWNLOAD CV <FiDownload size={22} />
		</Button>
	)
}

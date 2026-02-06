import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const ProtectedPage = lazy(() => import('../components/page/protected-page'))
const Login = lazy(() => import('../pages/login'))
const Thanks = lazy(() => import('../pages/thanks'))
const NotFound = lazy(() => import('../pages/not-found'))
const Home = lazy(() => import('@app/pages/public/home'))
const Config = lazy(() => import('@app/pages/private'))
const ConfigHome = lazy(() => import('@app/pages/private/config-home'))
const ConfigAbout = lazy(() => import('@app/pages/private/config-about'))
const ConfigEducation = lazy(() => import('@app/pages/private/config-education'))
const ConfigExperience = lazy(() => import('@app/pages/private/config-experience'))
const ConfigSkill = lazy(() => import('@app/pages/private/config-skill'))
const ConfigProject = lazy(() => import('@app/pages/private/config-project'))
const ConfigSocialMedia = lazy(() => import('@app/pages/private/config-social-media'))
const ConfigCurriculum = lazy(() => import('@app/pages/private/config-curriculum'))
const About = lazy(() => import('@app/pages/public/about'))
const Skills = lazy(() => import('@app/pages/public/skill'))
const Projects = lazy(() => import('@app/pages/public/project'))
const Contact = lazy(() => import('@app/pages/public/contact'))

const LoadingFallback = lazy(() => import('../components/common/loading'))

export default function App() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/config" element={<Config />}>
					<Route index element={<Navigate to="/config/home" replace />} />
					<Route path="home" element={<ConfigHome />} />
					<Route path="about" element={<ConfigAbout />} />
					<Route path="education" element={<ConfigEducation />} />
					<Route path="experience" element={<ConfigExperience />} />
					<Route path="skills" element={<ConfigSkill />} />
					<Route path="projects" element={<ConfigProject />} />
					<Route path="social-media" element={<ConfigSocialMedia />} />
					<Route path="curriculum" element={<ConfigCurriculum />} />
				</Route>
				<Route path="/thanks" element={<Thanks />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="*" element={<NotFound />} />

				<Route path="/" element={<ProtectedPage />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="skills" element={<Skills />} />
					<Route path="projects" element={<Projects />} />
					<Route path="contact" element={<Contact />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

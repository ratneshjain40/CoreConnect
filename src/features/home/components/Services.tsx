import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Search, Users2 } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
	{
		category: 'Education',
		icon: GraduationCap,
		title: 'Comprehensive Courses',
		description:
			'Structured learning programs covering invertebrate zoology, taxonomy, and field research methods.',
		features: [
			'Theoretical foundations',
			'Practical laboratory sessions',
			'Expert-led workshops',
			'Certification programs',
		],
		link: '/courses',
		color: 'green',
	},
	{
		category: 'Research',
		icon: Search,
		title: 'Field Expeditions',
		description:
			'Immersive research experiences in diverse ecosystems with hands-on invertebrate studies.',
		features: [
			'Guided field trips',
			'Data collection training',
			'Species identification',
			'Research methodology',
		],
		link: '/events',
		color: 'gray',
	},
	{
		category: 'Outreach',
		icon: Users2,
		title: 'Public Engagement',
		description:
			'Educational programs designed to raise awareness about invertebrate conservation.',
		features: [
			'School workshops',
			'Community talks',
			'Conservation awareness',
			'Citizen science projects',
		],
		link: '/about',
		color: 'green',
	},
	{
		category: 'Resources',
		icon: BookOpen,
		title: 'Knowledge Hub',
		description:
			'Comprehensive library of research papers, identification guides, and educational materials.',
		features: [
			'Research publications',
			'Identification guides',
			'Video tutorials',
			'Resource downloads',
		],
		link: '/blogs',
		color: 'gray',
	},
];

export const Services = () => {
	return (
		<section className="w-full py-20 md:py-28 lg:py-36 bg-gray-50">
			<div className="container px-4 md:px-6">
				{/* Header */}
				<div className="mx-auto max-w-3xl space-y-6 text-center mb-16">
					<div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
						<Search className="h-4 w-4" />
						Our Services
					</div>
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
						Comprehensive{' '}
						<span className="text-green-600"> Research & Education</span> Solutions
					</h2>
					<p className="text-lg text-gray-600 leading-relaxed">
						From structured courses to field expeditions, we offer a complete range of services
						designed to advance invertebrate zoology education and research.
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{SERVICES.map((service, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
						>
							<div className="p-8 space-y-6">
								{/* Header */}
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div
											className={`inline-flex items-center justify-center rounded-xl p-3 shadow-lg ${
												service.color === 'green' ? 'bg-green-600' : 'bg-gray-700'
											}`}
										>
											<service.icon className="h-6 w-6 text-white" />
										</div>
										<span
											className={`rounded-full px-3 py-1 text-xs font-medium ${
												service.color === 'green'
													? 'bg-green-100 text-green-800 border border-green-200'
													: 'bg-gray-100 text-gray-800 border border-gray-200'
											}`}
										>
											{service.category}
										</span>
									</div>

									<div className="space-y-3">
										<h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
											{service.title}
										</h3>
										<p className="text-gray-600 leading-relaxed">
											{service.description}
										</p>
									</div>
								</div>

								{/* Features List */}
								<div className="space-y-3">
									{service.features.map((feature, featureIndex) => (
										<div key={featureIndex} className="flex items-center gap-3">
											<CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
											<span className="text-sm text-gray-700">{feature}</span>
										</div>
									))}
								</div>

								{/* CTA */}
								<Link
									href={service.link}
									className={`group/link inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
										service.color === 'green'
											? 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500'
											: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-500'
									}`}
								>
									Learn More
									<ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
								</Link>
							</div>

							{/* Hover effect overlay */}
							<div
								className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
									service.color === 'green'
										? 'bg-gradient-to-br from-green-500/5 to-green-600/5'
										: 'bg-gradient-to-br from-gray-500/5 to-gray-600/5'
								}`}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

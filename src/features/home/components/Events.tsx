import { Award, Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

const EVENTS = [
	{
		id: 1,
		title: 'Dnyan Prabodhini Outdoor Excursion',
		description:
			'A successful full-day outing for Science Club students exploring Entomology, Botany, and Earth Sciences through nature trails and interactive discussions.',
		image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
		date: '29 Aug 2024',
		location: 'Chalkewadi, Satara',
		participants: 'Science Club, Dnyan Prabodhini Pimpri School',
		link: '#',
		type: 'Educational Excursion',
		highlights: [
			'Nature Trails',
			'Interactive Discussions',
			'Q&A Sessions',
		],
	},
	{
		id: 2,
		title: 'Eco March 2024/25',
		description:
			'Nature walks promoting wildlife conservation and sustainable development, bringing together diverse participants from various backgrounds.',
		image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
		date: 'Throughout 2024/25',
		location: 'Pune',
		participants: 'Kids, IT Professionals, Naturalists, Environmental Enthusiasts',
		link: '#',
		grant: true,
		type: 'Conservation Initiative',
		highlights: [
			'Diverse Participation',
			'Educational Sessions',
			'Sustainable Solutions',
		],
	},
	{
		id: 3,
		title: 'Children Special with Green Panther',
		description:
			'An exciting insect walk for Green Panther Club members, featuring hands-on learning about insects and wildlife conservation.',
		image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
		date: '06 April 2025',
		location: 'Pune',
		participants: 'Children with High Curiosity and Interest in Nature',
		link: '#',
		type: "Children's Program",
		highlights: [
			'Hands-On Learning',
			'Insect Interaction',
			'Conservation Education',
		],
	},
];

export const Events = () => (
	<section className="w-full py-20 md:py-28 lg:py-36 bg-white">
		<div className="container px-4 md:px-6">
			{/* Header */}
			<div className="mx-auto max-w-3xl space-y-6 text-center mb-16">
				<div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
					<Calendar className="h-4 w-4" />
					Past Events
				</div>
				<h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
					Join Our
					<span className="text-green-600"> Research Events</span>
					& Workshops
				</h2>
				<p className="text-lg text-gray-600 leading-relaxed">
					Participate in hands-on workshops, field expeditions, and masterclasses designed
					to enhance your knowledge and skills in invertebrate zoology.
				</p>
			</div>

			{/* Events Grid */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{EVENTS.map(
					({
						id,
						title,
						description,
						image,
						date,
						location,
						participants,
						grant,
						type,
						highlights,
						link,
					}) => (
						<div
							key={id}
							className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
								grant
									? 'border-green-300 ring-2 ring-green-100'
									: 'border-gray-200'
							}`}
						>
							{/* Featured Badge */}
							{grant && (
								<div className="absolute top-4 right-4 z-10">
									<div className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
										<Award className="h-3 w-3" />
										Grant
									</div>
								</div>
							)}

							{/* Image Container */}
							<div className="relative h-48 overflow-hidden">
								<Image
									src={image}
									alt={title}
									width="400"
									height="200"
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</div>

							{/* Content */}
							<div className="p-6 space-y-6">
								{/* Event Type & Status */}
								<div className="flex items-center justify-between">
									<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200">
										{type}
									</span>
									<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 border border-green-200">
										Completed
									</span>
								</div>

								{/* Title & Description */}
								<div className="space-y-3">
									<h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
										{title}
									</h3>
									<p className="text-gray-600 text-sm leading-relaxed">
										{description}
									</p>
								</div>

								{/* Event Details */}
								<div className="space-y-3">
									<div className="flex items-center gap-3 text-sm text-gray-600">
										<Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
										<span>{date}</span>
									</div>
									<div className="flex items-center gap-3 text-sm text-gray-600">
										<MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
										<span>{location}</span>
									</div>
									<div className="flex items-center gap-3 text-sm text-gray-600">
										<Users className="h-4 w-4 text-green-600 flex-shrink-0" />
										<span>{participants}</span>
									</div>
								</div>

								{/* Highlights */}
								<div className="space-y-2">
									<h4 className="text-sm font-semibold text-gray-900">Highlights:</h4>
									<div className="flex flex-wrap gap-2">
										{highlights.map((highlight, index) => (
											<span
												key={index}
												className="rounded-lg bg-green-50 px-2 py-1 text-xs text-green-700 border border-green-200"
											>
												{highlight}
											</span>
										))}
									</div>
								</div>

								{/* CTA Button */}
								{/* <Link
									href="/events"
									className={`group/link inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
										grant
											? 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500'
											: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-500'
									}`}
								>
									Learn More
									<ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
								</Link> */}
							</div>

							{/* Hover effect overlay */}
							<div
								className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
									grant
										? 'bg-gradient-to-br from-green-500/5 to-green-600/10'
										: 'bg-gradient-to-br from-gray-500/5 to-gray-600/5'
								}`}
							/>
						</div>
					)
				)}
			</div>
		</div>
	</section>
);

import logo from '@/assets/entomon-logo.webp';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/constants/icons';
import Image from 'next/image';
import Link from 'next/link';

export const FOOTER_LINKS = [
	{ id: 1, href: '/about', label: 'About' },
	{ id: 2, href: '/events', label: 'Events' },
	{ id: 3, href: '/blogs', label: 'Resources' },
	{ id: 4, href: '/contact', label: 'Contact' },
];

export const QUICK_LINKS = [
	{ id: 1, href: '/research', label: 'Research Projects' },
	{ id: 2, href: '/publications', label: 'Publications' },
	{ id: 3, href: '/field-guides', label: 'Field Guides' },
	{ id: 4, href: '/species-database', label: 'Species Database' },
	{ id: 5, href: '/careers', label: 'Careers' },
];

export const SOCIAL_LINKS = [
	{
		id: 1,
		href: 'mailto:entomoninstitute@gmail.com',
		icon: <Icon name="gmail" className="h-5 w-5" />,
		label: 'Email us'
	},
	{
		id: 2,
		href: 'https://www.linkedin.com/company/entomon-institute',
		icon: <Icon name="linkedin" className="h-5 w-5" />,
		label: 'Follow on LinkedIn'
	},
	{
		id: 3,
		href: 'https://www.instagram.com/entomon_institute',
		icon: <Icon name="instagram" className="h-5 w-5" />,
		label: 'Follow on Instagram'
	},
];

export const Footer = () => (
	<footer className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 border-t border-gray-800/50">
		<div className="container px-4 md:px-6">
			{/* Main Footer Content */}
			<div className="grid grid-cols-1 gap-12 pt-16 pb-12 lg:grid-cols-4 lg:gap-16">
				{/* Brand Section */}
				<div className="lg:col-span-2 space-y-6">
					<div className="flex items-center gap-3">
						<div className="relative group">
							<Image
								src={logo}
								height={48}
								width={48}
								alt="Entomon Institute Logo"
								className="rounded-full shadow-lg"
							/>
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 group-hover:from-green-400/30 group-hover:to-green-600/30 transition-all"></div>
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold text-white">Entomon Institute</span>
							<span className="text-sm text-green-400 font-medium">
								Invertebrate Zoology
							</span>
						</div>
					</div>
					<p className="text-gray-300 leading-relaxed max-w-md">
						Leading research institute advancing invertebrate zoology through innovative education,
						groundbreaking research, and immersive field experiences.
					</p>

					{/* Social Media */}
					<div className="flex gap-4">
						{SOCIAL_LINKS.map((social) => (
							<a
								key={social.id}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
								className="flex items-center justify-center w-10 h-10 bg-gray-800/50 hover:bg-green-600 text-gray-400 hover:text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-600/25"
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>

				{/* Quick Links */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-white">Quick Links</h3>
					<nav className="space-y-3">
						{FOOTER_LINKS.map((link) => (
							<Link
								key={link.id}
								href={link.href}
								className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>

				{/* Resources */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-white">Resources</h3>
					<nav className="space-y-3">
						{QUICK_LINKS.map((link) => (
							<Link
								key={link.id}
								href={link.href}
								className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
			</div>

			<Separator className="bg-gray-800/50" />

			{/* Bottom Section */}
			<div className="py-6">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-gray-400">
					<div className="flex items-center gap-1">
						<span>© 2025 Entomon Institute of Invertebrates Zoology. All rights reserved.</span>
					</div>
					<div className="flex gap-6">
						<Link href="/privacy-policy" className="hover:text-green-400 transition-colors">
							Privacy Policy
						</Link>
						<Link href="/terms-of-service" className="hover:text-green-400 transition-colors">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</div>

		{/* Decorative Background Elements */}
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600/5 rounded-full blur-3xl"></div>
			<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
		</div>
	</footer>
);

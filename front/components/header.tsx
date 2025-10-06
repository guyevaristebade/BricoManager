import React from "react"
import { Wrench, Menu, X } from "lucide-react"

interface HeaderProps {
	isMenuOpen: boolean
	setIsMenuOpen: (isOpen: boolean) => void
}
export const Header = ({ isMenuOpen, setIsMenuOpen }: HeaderProps) => {
	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-2">
						<Wrench className="w-8 h-8 text-orange-500" />
						<span className="text-2xl font-bold text-gray-800">
							ToolBox Manager
						</span>
					</div>

					<div className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-gray-600 hover:text-orange-500 transition"
						>
							Fonctionnalités
						</a>
						<a
							href="#about"
							className="text-gray-600 hover:text-orange-500 transition"
						>
							À propos
						</a>
						<a
							href="#contact"
							className="text-gray-600 hover:text-orange-500 transition"
						>
							Contact
						</a>
						<button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
							Commencer
						</button>
					</div>

					<button
						className="md:hidden text-gray-600"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>

				{isMenuOpen && (
					<div className="md:hidden pb-4 space-y-3">
						<a
							href="#features"
							className="block text-gray-600 hover:text-orange-500"
						>
							Fonctionnalités
						</a>
						<a
							href="#about"
							className="block text-gray-600 hover:text-orange-500"
						>
							À propos
						</a>
						<a
							href="#contact"
							className="block text-gray-600 hover:text-orange-500"
						>
							Contact
						</a>
						<button className="w-full bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
							Commencer
						</button>
					</div>
				)}
			</nav>
		</header>
	)
}

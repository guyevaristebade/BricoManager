import React from "react"
import { Wrench } from "lucide-react"

export const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-center gap-8">
					<div className="">
						<div className="flex flex-col items-center gap-2 space-x-2 mb-4">
							<Wrench className="w-8 h-8 text-orange-500" />
							<span className="text-xl font-bold">
								ToolBox Manager
							</span>
						</div>
						<p className="text-gray-400 text-center">
							La solution complète pour gérer vos outils et
							projets de bricolage.
						</p>
					</div>

					{/* <div>
						<h4 className="font-bold text-lg mb-4">Produit</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									Fonctionnalités
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									Tarifs
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									FAQ
								</a>
							</li>
						</ul>
					</div> */}

					{/* <div>
						<h4 className="font-bold text-lg mb-4">Entreprise</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									À propos
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									Carrières
								</a>
							</li>
						</ul>
					</div> */}

					{/* <div>
						<h4 className="font-bold text-lg mb-4">Support</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a
									href="#contact"
									className="hover:text-orange-500 transition"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									Documentation
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-orange-500 transition"
								>
									Confidentialité
								</a>
							</li>
						</ul>
					</div> */}
				</div>

				<div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
					<p>&copy; 2025 ToolBox Manager. Tous droits réservés.</p>
				</div>
			</div>
		</footer>
	)
}

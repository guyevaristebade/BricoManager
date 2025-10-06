"use client"

import { Header } from "@/components/header"
import { useState } from "react"

export default function Home() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	return (
		<div>
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
		</div>
	)
}

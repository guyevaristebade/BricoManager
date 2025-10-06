import React from "react"

interface SectionProps {
	children?: React.ReactNode
	className?: string
}

// je veux pouvoir définir des px selon des tailles sm, md ou lg

export const Section = ({ children, className }: SectionProps) => {
	return <div className={className}>{children}</div>
}

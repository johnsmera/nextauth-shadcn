export function LoginBackground() {
	return (
		<div className="relative w-full h-full -z-10 overflow-hidden bg-background">
			{/* Círculos cortados superiores */}
			<div className="absolute -top-[5%] left-[12.5%] w-[38vw] h-[38vw] min-w-[300px] min-h-[300px] max-w-[700px] max-h-[700px] rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 [clip-path:inset(0_50%_0_0)] -rotate-35" />
			<div className="absolute top-[5%] left-[78%] w-[28vw] h-[28vw] min-w-[240px] min-h-[240px] max-w-[500px] max-h-[500px] rounded-full bg-secondary -translate-x-1/2 -translate-y-1/2 [clip-path:inset(0_0_0_50%)] -rotate-35" />

			{/* Círculos inferiores */}
			<div className="absolute bottom-[25%] right-[45%] w-[35vw] h-[30vw] min-w-[300px] min-h-[250px] max-w-[600px] max-h-[500px] rounded-full bg-secondary -translate-x-1/2 translate-y-1/2" />
			<div className="absolute bottom-0 -right-[5%] w-[45vw] h-[45vw] min-w-[400px] min-h-[400px] max-w-[750px] max-h-[750px] rounded-full bg-primary translate-x-1/2 translate-y-1/2" />
		</div>
	);
}

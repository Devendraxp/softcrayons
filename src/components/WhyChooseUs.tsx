const features = [
	{
		title: 'Industry-Focused Curriculum',
		description:
			'Learn skills that companies actually need with input from top hiring managers.',
		titleBg: 'bg-orange-200 dark:bg-orange-500/30',
		span: 'md:col-span-2',
	},
	{
		title: 'Real-World Projects',
		description: 'Build 10+ production-grade projects for your portfolio.',
		titleBg: 'bg-blue-200 dark:bg-blue-500/30',
		span: 'md:col-span-1',
	},
	{
		title: '1-on-1 Mentorship',
		description: 'Get personalized guidance from experienced FAANG developers.',
		titleBg: 'bg-purple-200 dark:bg-purple-500/30',
		span: 'md:col-span-1',
	},
	{
		title: 'Active Community',
		description: 'Join 50,000+ learners in our Discord community.',
		titleBg: 'bg-green-200 dark:bg-green-500/30',
		span: 'md:col-span-1',
	},
	{
		title: 'Lifetime Access',
		description: 'Access all course materials forever with free updates.',
		titleBg: 'bg-pink-200 dark:bg-pink-500/30',
		span: 'md:col-span-2',
	},
	{
		title: 'Certified Courses',
		description: 'Earn industry-recognized certificates upon completion.',
		titleBg: 'bg-yellow-200 dark:bg-yellow-500/30',
		span: 'md:col-span-1',
	},
	{
		title: 'Placement Support',
		description: 'Get job referrals and interview preparation assistance.',
		titleBg: 'bg-teal-200 dark:bg-teal-500/30',
		span: 'md:col-span-1',
	},
	{
		title: 'Flexible Learning',
		description: 'Learn at your own pace with self-paced modules.',
		titleBg: 'bg-indigo-200 dark:bg-indigo-500/30',
		span: 'md:col-span-1',
	},
	{
		title: '24/7 Support',
		description: 'Get help anytime with our dedicated support team.',
		titleBg: 'bg-rose-200 dark:bg-rose-500/30',
		span: 'md:col-span-2',
	},
];

export function WhyChooseUs() {
	return (
		<section className="py-24 bg-muted/30">
			<div className="container">
				{/* Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
						Why Choose Us
					</span>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
						Built for Your{' '}
						<span className="text-gradient">Success</span>
					</h2>
					<p className="text-muted-foreground text-lg">
						Hum padhane ke sath sath aapko vo environment bhi dete hain jo aapko sikhne me madad kare. Real world projects, personal mentorship, aur ek active community ke sath, hum aapki success ke liye committed hain.
					</p>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
					{features.map((feature, index) => (
						<div
							key={feature.title}
							className={`group relative rounded-3xl p-6 bg-card hover:shadow-xl transition-all duration-300 animate-fade-up flex flex-col justify-end ${feature.span}`}
							style={{ animationDelay: `${index * 0.05}s`, minHeight: '160px' }}
						>
							{/* Content */}
							<div>
								<h3
									className={`inline-block px-3 py-1.5 rounded-md text-sm font-semibold mb-2 text-foreground ${feature.titleBg}`}
								>
									{feature.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

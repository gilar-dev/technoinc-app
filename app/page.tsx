import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";

const homepageLinks = [
	{ label: "Wiki", href: "/wiki", icon: "fa-book-open", description: "Explore articles" },
	{ label: "Contributor", href: "/contributor", icon: "fa-people-group", description: "Meet contributors" },
	{ label: "Category", href: "/category", icon: "fa-layer-group", description: "Browse topics" },
	{ label: "Template", icon: "fa-file-lines" },
	{ label: "Portal", icon: "fa-compass" },
	{ label: "Map", icon: "fa-map" },
];

const frequentlyAskedQuestions = [
	{
		question: "What is the TechnoInc MC Wiki?",
		answer: "It is a singleplayer survival world owned by GilarInc reference for the TechnoInc Minecraft survival world, collecting information about its places, people, projects, stories, and history."
	},
	{
		question: "How do I find an article?",
		answer: "Use the search button in the top navigation to search article titles, or browse the category index to explore related subjects."
	},
	{
		question: "Can I contribute or correct an article?",
		answer: "Yes. Use the Contribution page to draft an article or open an existing article's edit page to make improvements. Add a contributor name or alias and a short summary when submitting."
	},
	{
		question: "Will my contributor name and changes be public?",
		answer: "Yes. Submitted revisions may display the name or alias, edit summary, date, and recorded block changes in the article's public revision history. Choose an alias you are comfortable sharing."
	},
	{
		question: "Where can I review an article's revisions?",
		answer: "Open an article and use its revision-history link to see recorded edits grouped by date, including their summaries and block-level changes."
	},
	{
		question: "Is this an official Minecraft or Mojang website?",
		answer: "No. TechnoInc MC Wiki is an independent community project and is not affiliated with Mojang or Microsoft."
	}
];

export default function Home() {
	return (
		<div className="md:relative md:w-[75%] md:left-[25%]">
			<Menubar />
			<div className="fixed top-0 left-0 z-2 md:w-[25%]">
				<SidebarOverlay />
				<Sidebar />
			</div>
			<main className="min-h-[calc(100vh-4rem)] px-3 py-8 font-basic lg:px-7 lg:py-10">
				<div className="mx-auto max-w-5xl">
					<header className="flex min-h-[min(70vh,42rem)] flex-col items-center justify-center border-b border-border px-2 pb-10 text-center sm:pb-12">
						<div className="mb-7">
							<h1 className="font-historical text-4xl font-medium sm:text-5xl">TechnoInc MC Wiki</h1>
							<p className="mt-1 font-historical text-lg font-semibold text-sidebar-accent sm:text-xl">
								A Survival World Encyclopedia
							</p>
						</div>

						<nav aria-label="Explore TechnoInc Wiki" className="hidden max-w-3xl grid-cols-[1fr_auto_1fr] grid-rows-3 items-center gap-x-8 gap-y-3 sm:grid lg:gap-x-14">
							{homepageLinks.map(({ label, href, icon, description }, index) => {
								const position = [
									"col-start-1 row-start-1",
									"col-start-3 row-start-1",
									"col-start-1 row-start-2",
									"col-start-3 row-start-2",
									"col-start-1 row-start-3",
									"col-start-3 row-start-3",
								][index];
								const content = (
									<>
										<span className={`mb-1 flex items-center justify-center gap-2 text-lg font-bold ${href ? "text-link" : "text-foreground/50"}`}>
											<i className={`fa-solid ${icon}`} aria-hidden="true"></i>
											{label}
										</span>
										<span className="text-sm text-foreground/65">{description ?? "Coming soon"}</span>
									</>
								);

								return href ? (
									<Link
										key={label}
										href={href}
										className={`${position} rounded-md px-3 py-2 transition-colors hover:bg-list-bg focus-visible:outline-2 focus-visible:outline-sidebar-accent`}
									>
										{content}
									</Link>
								) : (
									<div key={label} aria-disabled="true" className={`${position} px-3 py-2`}>
										{content}
									</div>
								);
							})}

							<div className="col-start-2 row-span-3 row-start-1 flex h-50 w-50 items-center justify-center text-sidebar-accent shadow-inner sm:h-54 sm:w-54">
								<img src="/icons/technoinc-logo.png" alt="TechnoInc MC Wiki" />
							</div>
						</nav>

						<div className="flex h-70 w-70 mb-7 items-center justify-center text-sidebar-accent shadow-inner sm:hidden">
							<img src="/icons/technoinc-logo.png" alt="TechnoInc MC Wiki" />
						</div>
						<nav aria-label="Explore TechnoInc Wiki" className="grid w-full max-w-xl grid-cols-2 gap-3 sm:hidden">

							{homepageLinks.map(({ label, href, icon }) => {
								const content = (
									<>
										<i className={`fa-solid ${icon} text-sidebar-accent`} aria-hidden="true"></i>
										<span className="font-semibold">{label}</span>
										{!href && <span className="col-span-2 text-xs text-foreground/55">Coming soon</span>}
									</>
								);

								return href ? (
									<Link key={label} href={href} className="flex min-h-16 items-center justify-center gap-2 border border-sidebar-border bg-form-bg px-2 py-3 hover:bg-list-bg">
										{content}
									</Link>
								) : (
									<div key={label} aria-disabled="true" className="grid min-h-16 grid-cols-[auto_auto] content-center items-center justify-center gap-x-2 border border-sidebar-border/60 px-2 py-2 text-foreground/50">
										{content}
									</div>
								);
							})}
						</nav>

						<div className="mt-7 flex w-full flex-col items-center gap-3">
							<HomeSearch />
							<p className="max-w-xl text-sm leading-6 text-foreground/65">
								Explore the places, people, stories, and history of the TechnoInc Minecraft world.
							</p>
						</div>
					</header>

					<section className="border-t border-border py-8 lg:py-10" aria-labelledby="about-heading">
						<div className="max-w-3xl">
							<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">About the project</p>
							<h2 id="about-heading" className="font-historical text-2xl font-medium">A shared record of a living world</h2>
							<p className="mt-4 leading-7 text-foreground/75">
								Survival worlds change as players build, explore, and create new stories. This wiki gives the community
								a place to preserve those details in one organized reference. Articles can include written explanations,
								images, categories, and revision histories, helping readers understand both what exists and how the record
								has grown over time.
							</p>
							<p className="mt-3 leading-7 text-foreground/75">
								The goal is useful, readable documentation rather than a finished or authoritative account. Pages can be
								expanded and corrected by contributors, and the history of those changes remains part of the article.
							</p>
						</div>
					</section>

					<section className="border-t border-border py-8 lg:py-10" aria-labelledby="faq-heading">
						<div className="mb-5">
							<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">Quick answers</p>
							<h2 id="faq-heading" className="font-historical text-2xl font-medium">Frequently asked questions</h2>
						</div>
						<div className="divide-y divide-border border-y border-border">
							{frequentlyAskedQuestions.map(({ question, answer }) => (
								<details key={question} name="home-faq" className="group py-4">
									<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
										<span>{question}</span>
										<i className="fa-solid fa-angle-down shrink-0 text-sm text-sidebar-accent transition-transform group-open:rotate-180" aria-hidden="true"></i>
									</summary>
									<p className="mt-3 max-w-3xl pr-6 leading-7 text-foreground/75">{answer}</p>
								</details>
							))}
						</div>
					</section>

					<p className="border-t border-border pt-4 text-sm text-foreground/60">
						TechnoInc MC Wiki is an independent personal-community project and is not affiliated with Mojang or Microsoft.
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}

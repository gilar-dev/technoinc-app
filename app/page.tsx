import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import Link from "next/link";

const frequentlyAskedQuestions = [
	{
		question: "What is the TechnoInc MC Wiki?",
		answer: "It is a community-maintained reference for the TechnoInc Minecraft survival world, collecting information about its places, people, projects, stories, and history."
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
			<main className="min-h-[calc(100vh-4rem)] px-3 py-8 font-basic lg:px-7 lg:py-12">
				<div className="mx-auto max-w-5xl">
					<header className="border-b border-border pb-8 lg:pb-10">
						<div className="mb-5 flex items-center gap-3 text-sidebar-accent">
							<span className="flex h-11 w-11 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-bg">
								<i className="fa-solid fa-cube text-xl" aria-hidden="true"></i>
							</span>
							<p className="text-xs font-semibold uppercase tracking-[0.16em]">A community encyclopedia</p>
						</div>
						<h1 className="font-historical text-4xl font-medium sm:text-5xl">TechnoInc MC Wiki</h1>
						<p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/75">
							A growing record of the TechnoInc Minecraft survival world. Explore its places, people,
							stories, and history, documented and maintained by its community.
						</p>
						<div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
							<Link href="/wiki" className="inline-flex items-center gap-2 border border-link bg-link px-4 py-2.5 font-semibold text-white hover:brightness-110 active:brightness-110">
								<i className="fa-brands fa-wikipedia-w" aria-hidden="true"></i>
								Browse the wiki
							</Link>
							<Link href="/contribution" className="inline-flex items-center gap-2 border border-sidebar-border px-4 py-2.5 font-semibold hover:bg-list-bg active:bg-list-bg">
								<i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
								Contribute
							</Link>
						</div>
					</header>

					<section className="grid gap-8 py-8 sm:grid-cols-2 lg:gap-12 lg:py-10" aria-label="Explore the wiki">
						<div>
							<div className="mb-3 flex items-center gap-2 text-sidebar-accent">
								<i className="fa-solid fa-compass" aria-hidden="true"></i>
								<h2 className="font-montserrat text-lg font-semibold text-foreground">Explore the world</h2>
							</div>
							<p className="leading-7 text-foreground/75">
								Find articles by title or browse topics through the category index. Each page brings together
								information and the recorded history of how it has changed.
							</p>
							<Link href="/category" className="mt-4 inline-flex items-center gap-2 font-semibold text-link hover:underline active:underline">
								Explore categories <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
							</Link>
						</div>
						<div className="border-l-2 border-sidebar-accent pl-5 sm:pl-6">
							<div className="mb-3 flex items-center gap-2 text-sidebar-accent">
								<i className="fa-solid fa-people-group" aria-hidden="true"></i>
								<h2 className="font-montserrat text-lg font-semibold text-foreground">Built together</h2>
							</div>
							<p className="leading-7 text-foreground/75">
								Contributors can create articles, improve existing pages, and leave a summary with each revision.
								Use a name or alias you are comfortable showing in the public article history.
							</p>
							<Link href="/contribution" className="mt-4 inline-flex items-center gap-2 font-semibold text-link hover:underline active:underline">
								Start contributing <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
							</Link>
						</div>
					</section>

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
						TechnoInc MC Wiki is an independent community project and is not affiliated with Mojang or Microsoft.
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}

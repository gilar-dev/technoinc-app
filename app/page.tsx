import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

export default function Home() {

	return (
		<div className="md:relative md:w-[75%] md:left-[25%]">
			<Menubar />
			<div className="fixed top-0 left-0 z-2 md:w-[25%]">
				<SidebarOverlay />
				<Sidebar />
			</div>
		</div>
	);
}

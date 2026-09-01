import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

export default function Home() {

	return (
		<div className="w-full h-screen overflow-hidden flex flex-col md:flex-row">
			<div className="z-2 md:w-[25%]">
				<SidebarOverlay />
				<Sidebar />
			</div>
			<div className="overflow-auto md:w-[75%]">
				<Menubar />
			</div>
		</div>
	);
}

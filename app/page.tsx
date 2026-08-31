import { metadata } from "./layout";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";

export default function Home() {

	return (
		<div className="ti-viewport flex flex-col">
			<Menubar />
			<Sidebar />
		</div>
	);
}

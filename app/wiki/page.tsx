export default function WikiPage() {

    return (
        <div className="w-screen h-screen flex border border-red-500 [&>div]:border [&>div]:border-green-500">
            <div className="w-[10%]">
                <h1>Sidebar</h1>
            </div>
            <div className="w-[90%] overflow-auto flex flex-col gap-40">
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </div>
        </div>
    );
}
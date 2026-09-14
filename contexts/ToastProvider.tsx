import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                stacked={false}
                limit={1}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
            />
        </>
    );
}
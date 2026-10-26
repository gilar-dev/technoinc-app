import CategoryForm from "@/components/Contribution/CategoryForm";
import ArticleDataProvider from "@/contexts/ArticleDataProvider";

export default function CategoryPage() {
    return (
        <ArticleDataProvider>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <CategoryForm />
            </div>
        </ArticleDataProvider>
    );
}
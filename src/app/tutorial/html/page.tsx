
import { redirect } from 'next/navigation';
import { allTutorialPosts } from "contentlayer/generated";

export default function HtmlTutorialIndexPage() {
    const firstTutorial = allTutorialPosts
        .filter(p => p.language === 'html')
        .sort((a, b) => a.order - b.order)[0];

    if (firstTutorial) {
        redirect(firstTutorial.url);
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">No HTML tutorials found</h1>
            <p>Please add tutorial content to get started.</p>
        </div>
    );
}

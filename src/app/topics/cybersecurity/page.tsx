
import { Facebook, Youtube, Linkedin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define types for roadmap items to make the component more maintainable
type RoadmapItem = {
  text: string;
  isMain?: boolean; // For yellow items in the main path
  isPurple?: boolean; // For purple items
};

type RoadmapSection = {
  title: string;
  items: RoadmapItem[];
};

const RoadmapBlock = ({ item }: { item: RoadmapItem }) => {
  const baseClasses = "text-center text-sm font-medium p-2 rounded-md shadow-sm";
  let colorClasses = "bg-orange-100 text-orange-900 border border-orange-200"; // Default light brown/beige
  if (item.isMain) {
    colorClasses = "bg-yellow-200 text-yellow-900 border border-yellow-300"; // Yellow
  }
  if (item.isPurple) {
    colorClasses = "bg-purple-200 text-purple-900 border border-purple-300"; // Purple
  }

  return <div className={`${baseClasses} ${colorClasses}`}>{item.text}</div>;
};

export default function CybersecurityRoadmapPage() {
  // This data will be expanded in the next step
  const mainPath: RoadmapSection[] = [
    {
      title: "Fundamental IT Skills",
      items: [{ text: "Computer Hardware", isMain: true }],
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Cyber Security Roadmap</h1>
                <p className="text-gray-500 dark:text-gray-400">A guide to becoming a cybersecurity professional.</p>
            </div>
            <div className="text-right text-xs p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <p className="font-semibold">Find the latest version of this roadmap along with other similar roadmaps</p>
                <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center justify-end gap-1">
                    roadmap.sh <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </header>

        <main className="grid grid-cols-12 gap-4">
          {/* Social Icons Column */}
          <aside className="col-span-1 flex flex-col items-center space-y-4 pt-16">
            <Facebook className="text-gray-400" />
            <Youtube className="text-gray-400" />
            <Linkedin className="text-gray-400" />
          </aside>

          {/* Main Content Area */}
          <div className="col-span-10">
            <p className="text-center text-muted-foreground p-10 border-2 border-dashed rounded-lg">
                Roadmap structure will be implemented here in the next step.
            </p>
          </div>

          {/* Right Spacer Column */}
          <div className="col-span-1"></div>
        </main>
        
        <footer className="mt-12">
            <div className="w-full max-w-xs p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Ask us a question</p>
                <input 
                    type="text"
                    placeholder="type here..."
                    className="w-full mt-2 bg-transparent text-sm text-gray-500 dark:text-gray-400 outline-none"
                />
            </div>
        </footer>

      </div>
    </div>
  );
}

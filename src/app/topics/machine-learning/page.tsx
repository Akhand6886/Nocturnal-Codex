
"use client";

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Type for a single roadmap item/node
type RoadmapNodeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary';
};

// Generic block component with variants for different colors
const RoadmapNode = ({ children, className, variant = 'default' }: RoadmapNodeProps) => {
    const baseClasses = 'text-center text-xs font-medium p-2.5 rounded-lg shadow-sm border w-full';
    const colorClasses = {
      default: 'bg-orange-100 text-orange-900 border-orange-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50',
      primary: 'bg-yellow-300 text-yellow-900 border-yellow-400/80 dark:bg-yellow-500 dark:text-yellow-950 dark:border-yellow-600',
    };
    return (
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(baseClasses, colorClasses[variant], className, 'cursor-pointer hover:scale-105 transition-transform duration-200')}>
                    <span>{children}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                  <p>Details about "{String(children)}" coming soon!</p>
              </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    );
};

const DottedLine = ({ className }: { className?: string }) => (
    <div className={cn("absolute bg-repeat-y bg-[length:2px_8px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%23a3a3a3%27%20stroke-width%3d%272%27%20stroke-dasharray%3d%274%2c%204%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')]", className)} />
);


// --- Main Page Component ---
export default function MachineLearningRoadmapPage() {

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen p-4 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Machine Learning</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Step by step guide to becoming a Machine Learning Engineer in 2025</p>
            </header>

            <div className="w-full flex flex-col items-center space-y-4">
                
                {/* Machine Learning & Introduction */}
                <div className="relative w-full max-w-lg flex justify-center">
                    <div className="w-48"><RoadmapNode variant="primary">Machine Learning</RoadmapNode></div>
                    <div className="absolute top-full left-1/2 w-px h-8 bg-blue-500 -translate-x-1/2"></div>
                </div>

                <div className="relative w-full max-w-lg flex justify-center items-center h-24">
                     <div className="absolute left-1/2 w-px h-full bg-blue-500 top-0 -translate-x-1/2"></div>
                     <div className="w-48"><RoadmapNode variant="primary">Introduction</RoadmapNode></div>
                     <DottedLine className="w-16 h-px left-1/2 top-1/2" />
                     <div className="absolute left-[calc(50%+4rem)] top-1/2 -translate-y-1/2 space-y-2 w-48">
                         <RoadmapNode>What is an ML Engineer?</RoadmapNode>
                         <RoadmapNode>ML Engineer vs AI Engineer</RoadmapNode>
                         <RoadmapNode>Skills and Responsibilities</RoadmapNode>
                     </div>
                </div>
                
                {/* Mathematical Foundations */}
                <div className="relative w-full max-w-5xl flex justify-center items-start h-64">
                    <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500 -translate-x-1/2"></div>
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 w-96 h-px bg-blue-500"></div>

                    <div className="absolute top-8 left-[calc(50%-12rem)] -translate-x-1/2 w-px h-8 bg-blue-500"></div>
                    <div className="absolute top-8 right-[calc(50%-12rem)] -translate-x-1/2 w-px h-8 bg-blue-500"></div>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 text-center font-semibold text-gray-500">Mathematical Foundations</div>

                    {/* Calculus */}
                    <div className="absolute top-16 left-[calc(50%-12rem)] -translate-x-1/2 w-48 space-y-2">
                        <RoadmapNode variant="primary">Calculus</RoadmapNode>
                        <RoadmapNode>Derivatives, Partial Derivatives</RoadmapNode>
                        <RoadmapNode>Chain rule of derivation</RoadmapNode>
                        <RoadmapNode>Gradient, Jacobian, Hessian</RoadmapNode>
                    </div>

                    {/* Linear Algebra */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 space-y-2">
                         <RoadmapNode variant="primary">Linear Algebra</RoadmapNode>
                         <DottedLine className="w-16 h-px left-full top-1/2" />
                         <div className="absolute left-[calc(100%+4rem)] top-1/2 -translate-y-1/2 space-y-2 w-48">
                            <RoadmapNode>Matrix & Matrix Operations</RoadmapNode>
                            <RoadmapNode>Scalars, Vectors, Tensors</RoadmapNode>
                            <RoadmapNode>Singular Value Decomposition</RoadmapNode>
                            <RoadmapNode>Identity, Inverse Matrix</RoadmapNode>
                            <RoadmapNode>Eigenvalues, Diagonalization</RoadmapNode>
                         </div>
                    </div>

                    {/* Probability */}
                    <div className="absolute top-16 right-[calc(50%-12rem)] -translate-x-1/2 w-48 space-y-2">
                         <RoadmapNode variant="primary">Probability</RoadmapNode>
                         <RoadmapNode>Basics of Probability</RoadmapNode>
                         <RoadmapNode>Bayes Theorem</RoadmapNode>
                         <RoadmapNode>Random Variables, PDFs</RoadmapNode>
                         <RoadmapNode>Types of Distribution</RoadmapNode>
                    </div>
                </div>

                <div className="w-px h-8 bg-blue-500"></div>
                
                 {/* Discrete Math & Statistics */}
                <div className="relative w-full max-w-xl flex justify-between h-12">
                     <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500 -translate-x-1/2"></div>
                     <div className="absolute left-1/2 top-1/2 w-48 h-px bg-blue-500 -translate-x-full"></div>
                     <div className="absolute left-1/2 top-1/2 w-48 h-px bg-blue-500"></div>

                    <div className="w-48"><RoadmapNode variant="primary">Discrete Mathematics</RoadmapNode></div>
                    <div className="w-48"><RoadmapNode variant="primary">Statistics</RoadmapNode></div>
                </div>

                <div className="w-px h-8 bg-blue-500"></div>

                {/* Programming Fundamentals */}
                 <div className="relative w-full max-w-5xl flex justify-center items-start h-64">
                    <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500 -translate-x-1/2"></div>
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 w-96 h-px bg-blue-500"></div>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 text-center font-semibold text-gray-500">Programming Fundamentals</div>

                    {/* Python Main */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 space-y-2">
                        <RoadmapNode variant="primary">Python</RoadmapNode>
                        <div className="absolute top-full left-1/2 w-px h-8 bg-blue-500"></div>
                    </div>
                    
                    {/* OOP */}
                    <div className="absolute top-[13.5rem] left-[calc(50%-12rem)] -translate-x-1/2 w-48 space-y-2">
                        <RoadmapNode variant="primary">Object Oriented Programming</RoadmapNode>
                        <div className="absolute top-1/2 right-full w-24 h-px bg-blue-500"></div>
                    </div>

                    {/* Basic Syntax */}
                     <div className="absolute top-[13.5rem] left-1/2 -translate-x-1/2 w-48 space-y-2">
                         <RoadmapNode variant="primary">Basic Syntax</RoadmapNode>
                         <div className="absolute top-1/2 right-[-4rem] w-16 h-px bg-blue-500"></div>
                         <div className="absolute right-[-4rem] top-1/2 w-px h-40 bg-blue-500"></div>
                         <div className="absolute right-[-8rem] top-[calc(50%+10rem)] w-16 h-px bg-blue-500"></div>
                         <div className="absolute right-[-8rem] top-1/2 -translate-y-[calc(50%-1rem)] w-48 space-y-2">
                             <RoadmapNode>Variables and Data Types</RoadmapNode>
                             <RoadmapNode>Data Structures</RoadmapNode>
                             <RoadmapNode>Loops</RoadmapNode>
                             <RoadmapNode>Conditionals</RoadmapNode>
                             <RoadmapNode>Operators</RoadmapNode>
                             <RoadmapNode>Functions, Builtin Functions</RoadmapNode>
                         </div>
                    </div>
                     {/* Essential Libraries */}
                    <div className="absolute top-[13.5rem] right-[calc(50%-12rem)] -translate-x-1/2 w-48 space-y-2">
                         <RoadmapNode variant="primary">Essential Libraries</RoadmapNode>
                          <div className="absolute top-1/2 left-full w-24 h-px bg-blue-500"></div>
                         <div className="grid grid-cols-2 gap-2 pt-2">
                            <RoadmapNode>Numpy</RoadmapNode>
                            <RoadmapNode>Pandas</RoadmapNode>
                            <RoadmapNode>Matplotlib</RoadmapNode>
                            <RoadmapNode>Seaborn</RoadmapNode>
                         </div>
                    </div>
                </div>

                <div className="w-px h-8 bg-blue-500 mt-48"></div>

                {/* Data Collection */}
                <div className="relative w-full max-w-lg flex justify-center items-start h-40">
                     <div className="absolute left-1/2 w-px h-full bg-blue-500 top-0 -translate-x-1/2"></div>
                     <div className="absolute left-1/2 top-1/2 w-[32rem] h-px bg-blue-500 -translate-y-1/2 -translate-x-1/2"></div>
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 text-center font-semibold text-gray-500">Data Collection</div>
                     <div className="w-48 absolute top-1/2 -translate-y-1/2"><RoadmapNode variant="primary">Data Sources</RoadmapNode></div>
                     
                     <div className="w-48 absolute top-1/2 -translate-y-1/2 left-[calc(50%-16rem)] -translate-x-1/2"><RoadmapNode>Databases (SQL, No-SQL)</RoadmapNode></div>
                     <div className="w-48 absolute top-1/2 -translate-y-1/2 left-[calc(50%-8rem)] -translate-x-1/2"><RoadmapNode>Web Scraping</RoadmapNode></div>
                     <div className="w-48 absolute top-1/2 -translate-y-1/2 right-[calc(50%-16rem)] -translate-x-1/2"><RoadmapNode>APIs</RoadmapNode></div>
                     <div className="w-48 absolute top-1/2 -translate-y-1/2 right-[calc(50%-8rem)] -translate-x-1/2"><RoadmapNode>IoT</RoadmapNode></div>
                </div>

                 <div className="w-px h-8 bg-blue-500"></div>

                 {/* Data Cleaning */}
                <div className="relative w-full max-w-5xl flex justify-center items-start h-64">
                    <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500 -translate-x-1/2"></div>
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[32rem] h-px bg-blue-500"></div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 text-center font-semibold text-gray-500">Data Cleaning</div>

                    {/* Data Formats */}
                    <div className="absolute top-16 left-[calc(50%-16rem)] -translate-x-1/2 w-48 space-y-2">
                        <RoadmapNode variant="primary">Data Formats</RoadmapNode>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <RoadmapNode>CSV</RoadmapNode>
                            <RoadmapNode>JSON</RoadmapNode>
                            <RoadmapNode>Excel</RoadmapNode>
                            <RoadmapNode>Parquet</RoadmapNode>
                        </div>
                        <RoadmapNode>Other Data Formats</RoadmapNode>
                    </div>

                    {/* Preprocessing */}
                    <div className="absolute top-16 right-[calc(50%-16rem)] -translate-x-1/2 w-48 space-y-2">
                         <RoadmapNode variant="primary">Preprocessing Techniques</RoadmapNode>
                         <RoadmapNode>Data Cleaning</RoadmapNode>
                         <RoadmapNode>Feature Engineering</RoadmapNode>
                         <RoadmapNode>Feature Scaling & Normalization</RoadmapNode>
                         <RoadmapNode>Dimensionality Reduction</RoadmapNode>
                         <RoadmapNode>Feature Selection</RoadmapNode>
                    </div>
                </div>
                
                <div className="w-px h-8 bg-blue-500 mt-24"></div>

                {/* Machine Learning Core */}
                <div className="relative w-full max-w-5xl flex justify-center items-start h-80">
                     <div className="absolute left-1/2 top-0 w-px h-[calc(100%-4rem)] bg-blue-500 -translate-x-1/2"></div>
                     <div className="absolute left-1/2 top-8 w-96 h-px bg-blue-500 -translate-x-1/2"></div>

                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 text-center font-semibold text-gray-500">Machine Learning</div>

                     {/* What is ML */}
                     <div className="absolute top-16 left-[calc(50%-12rem)] -translate-x-1/2 w-48 space-y-2">
                        <DottedLine className="h-10 w-px -top-10 left-1/2" />
                        <DottedLine className="h-px w-24 -top-10 left-[calc(50%+1px)]" />
                        <RoadmapNode variant="primary">What is Machine Learning?</RoadmapNode>
                        <div className="absolute left-1/2 top-full w-px h-8 bg-blue-500"></div>
                        <div className="pt-10 space-y-2">
                            <RoadmapNode>Supervised Learning</RoadmapNode>
                            <RoadmapNode>Unsupervised Learning</RoadmapNode>
                            <RoadmapNode>Semi-supervised Learning</RoadmapNode>
                            <RoadmapNode>Self-supervised Learning</RoadmapNode>
                            <RoadmapNode>Reinforcement Learning</RoadmapNode>
                        </div>
                     </div>
                     
                     {/* Scikit-learn */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 space-y-2">
                        <RoadmapNode variant="primary">Scikit-learn</RoadmapNode>
                        <DottedLine className="w-16 h-px left-full top-1/2" />
                        <div className="absolute left-[calc(100%+4rem)] top-1/2 -translate-y-1/2 w-48 space-y-2">
                             <RoadmapNode>Data Loading</RoadmapNode>
                             <RoadmapNode>Train - Test Data</RoadmapNode>
                             <RoadmapNode>Preprocessing</RoadmapNode>
                             <RoadmapNode>Model Selection</RoadmapNode>
                             <RoadmapNode>Tuning</RoadmapNode>
                             <RoadmapNode>Prediction</RoadmapNode>
                        </div>
                     </div>
                </div>

                <div className="w-px h-8 bg-blue-500 mt-4"></div>

                {/* Supervised and Unsupervised Learning */}
                <div className="relative w-full max-w-7xl flex justify-center items-start h-96">
                    <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500 -translate-x-1/2"></div>
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[48rem] h-px bg-blue-500"></div>

                    {/* Supervised Learning */}
                    <div className="absolute top-16 left-[calc(50%-24rem)] -translate-x-1/2 w-48 space-y-2 text-center">
                        <div className="absolute left-1/2 -top-8 w-px h-8 bg-blue-500"></div>
                        <p className="font-semibold text-gray-500">Supervised Learning</p>
                        <div className="absolute left-1/2 top-8 w-px h-8 bg-blue-500"></div>
                        <div className="absolute left-[75%] top-8 w-40 h-px bg-blue-500"></div>
                        <div className="absolute left-[calc(100%+8rem)] top-8 w-px h-8 bg-blue-500"></div>
                        
                        <div className="pt-16 space-y-2"><RoadmapNode variant="primary">Classification</RoadmapNode></div>
                        <RoadmapNode>K-Nearest Neighbors (KNN)</RoadmapNode>
                        <RoadmapNode>Logistic Regression</RoadmapNode>
                        <RoadmapNode>Support Vector Machines</RoadmapNode>
                        <RoadmapNode>Decision Trees, Random Forest</RoadmapNode>
                        <RoadmapNode>Gradient Boosting Machines</RoadmapNode>
                    </div>

                     {/* Regression */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 space-y-2">
                        <RoadmapNode variant="primary">Regression</RoadmapNode>
                        <RoadmapNode>Linear Regression</RoadmapNode>
                        <RoadmapNode>Polynomial Regression</RoadmapNode>
                        <div className="grid grid-cols-2 gap-2"><RoadmapNode>Ridge</RoadmapNode><RoadmapNode>Lasso</RoadmapNode></div>
                        <RoadmapNode>ElasticNet Regularization</RoadmapNode>
                    </div>

                    {/* Unsupervised Learning */}
                    <div className="absolute top-16 right-[calc(50%-24rem)] -translate-x-1/2 w-48 space-y-2 text-center">
                        <div className="absolute left-1/2 -top-8 w-px h-8 bg-blue-500"></div>
                        <p className="font-semibold text-gray-500">Unsupervised Learning</p>
                         <div className="absolute left-1/2 top-8 w-px h-8 bg-blue-500"></div>
                         <div className="absolute left-1/2 top-16 w-40 h-px bg-blue-500 -translate-x-1/2"></div>
                         
                         <div className="pt-16 grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <RoadmapNode variant="primary">Dimensionality Reduction</RoadmapNode>
                                <RoadmapNode>Principal Component Analysis</RoadmapNode>
                                <RoadmapNode>Autoencoders</RoadmapNode>
                            </div>
                             <div className="space-y-2">
                                <RoadmapNode variant="primary">Clustering</RoadmapNode>
                                <RoadmapNode>Exclusive</RoadmapNode>
                                <RoadmapNode>Overlapping</RoadmapNode>
                                <RoadmapNode>Hierarchical</RoadmapNode>
                                <RoadmapNode>Probabilistic</RoadmapNode>
                            </div>
                         </div>
                    </div>
                </div>
                 <div className="w-px h-8 bg-blue-500"></div>
                 <RoadmapNode>Keep Going</RoadmapNode>
                 <div className="w-px h-8 bg-blue-500"></div>
            </div>
        </div>
    </div>
  );
}

    
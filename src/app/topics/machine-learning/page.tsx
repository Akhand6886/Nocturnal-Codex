"use client";

import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDown, ArrowRight, CornerDownRight } from 'lucide-react';


// Type for a single roadmap item/node
type RoadmapNodeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'plain';
};

// Generic block component with variants for different colors
const RoadmapNode = ({ children, className, variant = 'default' }: RoadmapNodeProps) => {
    const baseClasses = 'text-center text-xs font-medium p-2.5 rounded-lg shadow-sm border';
    const colorClasses = {
      default: 'bg-orange-100 text-orange-900 border-orange-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50',
      primary: 'bg-yellow-300 text-yellow-900 border-yellow-400/80 dark:bg-yellow-500 dark:text-yellow-950 dark:border-yellow-600',
      plain: 'text-center font-semibold text-gray-500 dark:text-gray-400 py-1 text-sm'
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


// --- Main Page Component ---
export default function MachineLearningRoadmapPage() {

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Machine Learning</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Step by step guide to becoming a Machine Learning Engineer in 2025</p>
        </header>

        <main className="flex flex-col items-center">
            {/* Top Section */}
            <div className="flex justify-center items-start gap-8 w-full mb-8">
                <div className="border rounded-lg p-4 space-y-2 bg-card">
                    <h3 className="font-bold text-sm mb-2">Pre-requisites</h3>
                    <RoadmapNode variant="secondary">Python Roadmap</RoadmapNode>
                </div>
                 <div className="border rounded-lg p-4 space-y-2 bg-card">
                    <h3 className="font-bold text-sm mb-2">Related Roadmaps</h3>
                    <RoadmapNode variant="secondary">AI Engineer Roadmap</RoadmapNode>
                    <RoadmapNode variant="secondary">MLOps Roadmap</RoadmapNode>
                    <RoadmapNode variant="secondary">AI and Data Scientist Roadmap</RoadmapNode>
                </div>
            </div>

            {/* Main Flow */}
            <div className="space-y-4 flex flex-col items-center">
                <RoadmapNode variant='plain'>Machine Learning</RoadmapNode>
                <ArrowDown className="text-gray-400"/>
                <div className="flex items-center">
                    <RoadmapNode variant='primary'>Introduction</RoadmapNode>
                    <div className="ml-4 space-y-2">
                        <RoadmapNode>What is an ML Engineer?</RoadmapNode>
                        <RoadmapNode>ML Engineer vs AI Engineer</RoadmapNode>
                        <RoadmapNode>Skills and Responsibilities</RoadmapNode>
                    </div>
                </div>
                <ArrowDown className="text-gray-400"/>
                <RoadmapNode variant='plain'>Mathematical Foundations</RoadmapNode>
                <div className="flex items-start gap-8">
                    {/* Calculus */}
                    <div className="flex flex-col items-center space-y-2">
                         <RoadmapNode variant='primary'>Calculus</RoadmapNode>
                         <RoadmapNode>Derivatives, Partial Derivatives</RoadmapNode>
                         <RoadmapNode>Chain rule of derivation</RoadmapNode>
                         <RoadmapNode>Gradient, Jacobian, Hessian</RoadmapNode>
                    </div>
                     {/* Linear Algebra */}
                    <div className="flex flex-col items-center space-y-2">
                         <RoadmapNode variant='primary'>Linear Algebra</RoadmapNode>
                         <div className="flex gap-4">
                            <div className="space-y-2">
                                <RoadmapNode>Matrix & Matrix Operations</RoadmapNode>
                                <RoadmapNode>Scalars, Vectors, Tensors</RoadmapNode>
                                <RoadmapNode>Singular Value Decomposition</RoadmapNode>
                                <RoadmapNode>Determinants, Inverse of Matrix</RoadmapNode>
                                <RoadmapNode>Eigenvalues, Diagonalization</RoadmapNode>
                            </div>
                         </div>
                    </div>
                     {/* Discrete Mathematics */}
                    <div className="flex flex-col items-center space-y-2">
                         <RoadmapNode variant='primary'>Discrete Mathematics</RoadmapNode>
                    </div>
                </div>

                <div className="flex items-center gap-16 mt-4">
                    <RoadmapNode variant='primary'>Statistics</RoadmapNode>
                    <RoadmapNode variant='primary'>Probability</RoadmapNode>
                </div>
                <div className="flex items-start gap-8">
                     <div className="flex flex-col items-center space-y-2">
                         <RoadmapNode>Basic concepts</RoadmapNode>
                         <RoadmapNode>Descriptive Statistics</RoadmapNode>
                         <RoadmapNode>Graphs & Charts</RoadmapNode>
                         <RoadmapNode>Inferential Statistics</RoadmapNode>
                    </div>
                     <div className="flex flex-col items-center space-y-2">
                         <RoadmapNode>Basics of Probability</RoadmapNode>
                         <RoadmapNode>Bayes Theorem</RoadmapNode>
                         <RoadmapNode>Random Variances, PDFs</RoadmapNode>
                         <RoadmapNode>Types of Distribution</RoadmapNode>
                    </div>
                </div>
                
                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Programming Fundamentals</RoadmapNode>
                <RoadmapNode variant='primary'>Python</RoadmapNode>

                <div className="flex items-start gap-8 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Object Oriented Programming</RoadmapNode>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Basic Syntax</RoadmapNode>
                        <RoadmapNode>Variables and Data Types</RoadmapNode>
                        <RoadmapNode>Data Structures</RoadmapNode>
                        <RoadmapNode>Loops</RoadmapNode>
                        <RoadmapNode>Conditionals</RoadmapNode>
                        <RoadmapNode>Exceptions</RoadmapNode>
                        <RoadmapNode>Functions, Builtin Functions</RoadmapNode>
                    </div>
                </div>
                 <div className="flex flex-col items-center space-y-2 mt-4">
                        <RoadmapNode variant='primary'>Essential Libraries</RoadmapNode>
                        <div className="flex gap-4">
                             <RoadmapNode>Numpy</RoadmapNode>
                             <RoadmapNode>Pandas</RoadmapNode>
                             <RoadmapNode>Matplotlib</RoadmapNode>
                             <RoadmapNode>Seaborn</RoadmapNode>
                        </div>
                 </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Data Collection</RoadmapNode>
                <div className="flex items-start gap-8 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Data Sources</RoadmapNode>
                        <RoadmapNode>Databases (SQL, No-SQL)</RoadmapNode>
                        <RoadmapNode>Internet</RoadmapNode>
                        <RoadmapNode>APIs</RoadmapNode>
                        <RoadmapNode>Mobile Apps</RoadmapNode>
                        <RoadmapNode>IoT</RoadmapNode>
                    </div>
                </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Data Cleaning</RoadmapNode>
                <div className="flex items-start gap-8 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Data Formats</RoadmapNode>
                        <div className="grid grid-cols-2 gap-2">
                            <RoadmapNode>CSV</RoadmapNode>
                            <RoadmapNode>Excel</RoadmapNode>
                            <RoadmapNode>JSON</RoadmapNode>
                            <RoadmapNode>Parquet</RoadmapNode>
                        </div>
                        <RoadmapNode>Other Data Formats</RoadmapNode>
                    </div>
                     <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Preprocessing Techniques</RoadmapNode>
                        <RoadmapNode>Data Clearing</RoadmapNode>
                        <RoadmapNode>Feature Engineering</RoadmapNode>
                        <RoadmapNode>Feature Scaling & Normalization</RoadmapNode>
                        <RoadmapNode>Dimensionality Reduction</RoadmapNode>
                        <RoadmapNode>Feature Selection</RoadmapNode>
                    </div>
                </div>
                
                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Machine Learning</RoadmapNode>
                <div className="flex items-start gap-8 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode>Supervised Learning</RoadmapNode>
                        <RoadmapNode>Unsupervised Learning</RoadmapNode>
                        <RoadmapNode>Semi-supervised Learning</RoadmapNode>
                        <RoadmapNode>Reinforcement Learning</RoadmapNode>
                    </div>
                     <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>What is Machine Learning?</RoadmapNode>
                        <RoadmapNode variant='primary'>Types of Machine Learning</RoadmapNode>
                    </div>
                </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <div className="flex items-center">
                    <RoadmapNode variant='primary'>Scikit-learn</RoadmapNode>
                    <div className="ml-4 space-y-2">
                        <RoadmapNode>Data Loading</RoadmapNode>
                        <RoadmapNode>Train - Test Data</RoadmapNode>
                        <RoadmapNode>Data Preparation</RoadmapNode>
                        <RoadmapNode>Model Selection</RoadmapNode>
                        <RoadmapNode>Tuning</RoadmapNode>
                        <RoadmapNode>Prediction</RoadmapNode>
                    </div>
                </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <div className="flex justify-between w-full max-w-4xl">
                     <RoadmapNode variant='plain'>Supervised Learning</RoadmapNode>
                     <RoadmapNode variant='plain'>Unsupervised Learning</RoadmapNode>
                </div>

                <div className="flex items-start justify-between w-full max-w-4xl mt-4">
                     {/* Supervised */}
                     <div className="flex gap-8">
                        <div className="flex flex-col items-center space-y-2">
                            <RoadmapNode variant='primary'>Classification</RoadmapNode>
                            <RoadmapNode>K-Nearest Neighbors (KNN)</RoadmapNode>
                            <RoadmapNode>Logistic Regression</RoadmapNode>
                            <RoadmapNode>Support Vector Machines</RoadmapNode>
                            <RoadmapNode>Decision Trees, Random Forest</RoadmapNode>
                            <RoadmapNode>Gradient Boosting Machines</RoadmapNode>
                        </div>
                         <div className="flex flex-col items-center space-y-2">
                            <RoadmapNode variant='primary'>Regression</RoadmapNode>
                            <RoadmapNode>Linear Regression</RoadmapNode>
                            <RoadmapNode>Polynomial Regression</RoadmapNode>
                            <div className="flex gap-2">
                                <RoadmapNode>Lasso</RoadmapNode>
                                <RoadmapNode>Ridge</RoadmapNode>
                            </div>
                            <RoadmapNode>ElasticNet Regularization</RoadmapNode>
                        </div>
                    </div>
                     {/* Unsupervised */}
                     <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>What is Unsupervised Learning?</RoadmapNode>
                    </div>
                </div>
                 <div className="flex justify-around w-full max-w-lg mt-8">
                     <RoadmapNode variant='primary'>Dimensionality Reduction</RoadmapNode>
                     <RoadmapNode variant='primary'>Clustering</RoadmapNode>
                </div>


            </div>
        </main>
      </div>
    </div>
  );
}

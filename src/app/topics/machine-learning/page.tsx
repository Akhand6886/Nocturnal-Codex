"use client";

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDown, ArrowRight, CornerDownRight, BookOpen } from 'lucide-react';
import Link from 'next/link';


// Type for a single roadmap item/node
type RoadmapNodeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'purple' | 'plain' | 'blue';
};

// Generic block component with variants for different colors
const RoadmapNode = ({ children, className, variant = 'default' }: RoadmapNodeProps) => {
    const baseClasses = 'text-center text-xs font-medium p-2.5 rounded-lg shadow-sm border';
    const colorClasses = {
      default: 'bg-orange-100 text-orange-900 border-orange-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50',
      primary: 'bg-yellow-300 text-yellow-900 border-yellow-400/80 dark:bg-yellow-500 dark:text-yellow-950 dark:border-yellow-600',
      secondary: 'bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
      purple: 'bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-800/60',
      blue: 'bg-blue-600 text-white dark:bg-blue-700/80 shadow-lg',
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

  const relatedRoadmaps = [
    { title: "Data Analyst", description: "Step by step guide to becoming an Data Analyst in 2025" },
    { title: "AI Engineer", description: "Step by step guide to becoming an AI Engineer in 2025" },
    { title: "AI and Data Scientist", description: "Step by step roadmap guide to becoming an AI and Data Scientist in 2025" },
    { title: "Data Engineer", description: "Step by step guide to becoming a Data Engineer in 2025" },
    { title: "Python", description: "Step by step guide to becoming a Python developer in 2025" },
    { title: "AI Agents", description: "Learn to design, build and ship AI agents in 2025" },
  ];

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
            <div className="space-y-4 flex flex-col items-center w-full">
                <RoadmapNode variant='plain'>Machine Learning</RoadmapNode>
                <ArrowDown className="text-gray-400"/>
                <div className="flex justify-center items-center">
                    <RoadmapNode variant='primary'>Introduction</RoadmapNode>
                    <div className="ml-4 space-y-2">
                        <RoadmapNode>What is an ML Engineer?</RoadmapNode>
                        <RoadmapNode>ML Engineer vs AI Engineer</RoadmapNode>
                        <RoadmapNode>Skills and Responsibilities</RoadmapNode>
                    </div>
                </div>
                <ArrowDown className="text-gray-400"/>
                <RoadmapNode variant='plain'>Mathematical Foundations</RoadmapNode>
                <div className="flex justify-center items-start flex-wrap gap-8">
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

                <div className="flex justify-center items-center flex-wrap gap-16 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Statistics</RoadmapNode>
                        <RoadmapNode>Basic concepts</RoadmapNode>
                        <RoadmapNode>Descriptive Statistics</RoadmapNode>
                        <RoadmapNode>Graphs & Charts</RoadmapNode>
                        <RoadmapNode>Inferential Statistics</RoadmapNode>
                   </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Probability</RoadmapNode>
                        <RoadmapNode>Basics of Probability</RoadmapNode>
                        <RoadmapNode>Bayes Theorem</RoadmapNode>
                        <RoadmapNode>Random Variances, PDFs</RoadmapNode>
                        <RoadmapNode>Types of Distribution</RoadmapNode>
                   </div>
                </div>
                
                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Programming Fundamentals</RoadmapNode>
                <RoadmapNode variant='primary'>Python</RoadmapNode>

                <div className="flex justify-center items-start flex-wrap gap-8 mt-4">
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
                        <div className="flex gap-4 flex-wrap justify-center">
                             <RoadmapNode>Numpy</RoadmapNode>
                             <RoadmapNode>Pandas</RoadmapNode>
                             <RoadmapNode>Matplotlib</RoadmapNode>
                             <RoadmapNode>Seaborn</RoadmapNode>
                        </div>
                 </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Data Collection</RoadmapNode>
                <div className="flex flex-col items-center space-y-2 mt-4">
                    <RoadmapNode variant='primary'>Data Sources</RoadmapNode>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        <RoadmapNode>Databases (SQL, No-SQL)</RoadmapNode>
                        <RoadmapNode>Internet</RoadmapNode>
                        <RoadmapNode>APIs</RoadmapNode>
                        <RoadmapNode>Mobile Apps</RoadmapNode>
                        <RoadmapNode>IoT</RoadmapNode>
                    </div>
                </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Data Cleaning</RoadmapNode>
                <div className="flex justify-center items-start flex-wrap gap-8 mt-4">
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
                <div className="flex justify-center items-center flex-wrap gap-8 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>What is Machine Learning?</RoadmapNode>
                        <RoadmapNode variant='primary'>Types of Machine Learning</RoadmapNode>
                    </div>
                    <div className="space-y-2">
                        <RoadmapNode>Supervised Learning</RoadmapNode>
                        <RoadmapNode>Unsupervised Learning</RoadmapNode>
                        <RoadmapNode>Semi-supervised Learning</RoadmapNode>
                        <RoadmapNode>Reinforcement Learning</RoadmapNode>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                     <div className="flex flex-col items-center space-y-4">
                        <RoadmapNode variant='plain'>Supervised Learning</RoadmapNode>
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
                     <div className="flex flex-col items-center space-y-4">
                        <RoadmapNode variant='plain'>Unsupervised Learning</RoadmapNode>
                         <div className="flex flex-col items-center space-y-2">
                            <RoadmapNode variant='primary'>Clustering</RoadmapNode>
                            <RoadmapNode>Exclusive</RoadmapNode>
                            <RoadmapNode>Overlapping</RoadmapNode>
                            <RoadmapNode>Hierarchical</RoadmapNode>
                            <RoadmapNode>Probabilistic</RoadmapNode>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <RoadmapNode variant='primary'>Dimensionality Reduction</RoadmapNode>
                            <RoadmapNode>Principal Component Analysis</RoadmapNode>
                            <RoadmapNode>Autoencoders</RoadmapNode>
                        </div>
                    </div>
                </div>
                
                 {/* NEW CONTENT STARTS HERE */}
                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Model Evaluation</RoadmapNode>
                <div className="flex justify-center items-start gap-8 w-full">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>What is Reinforcement Learning?</RoadmapNode>
                        <ArrowDown className="text-gray-400"/>
                        <RoadmapNode>Deep-Q Networks</RoadmapNode>
                        <RoadmapNode>Policy Gradient</RoadmapNode>
                        <RoadmapNode>Actor-Critic Methods</RoadmapNode>
                        <RoadmapNode>Q-Learning</RoadmapNode>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>What is Model Evaluation?</RoadmapNode>
                        <RoadmapNode variant='primary'>Why is it important?</RoadmapNode>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Metrics to Evaluate</RoadmapNode>
                        <div className="grid grid-cols-2 gap-2">
                            <RoadmapNode>Accuracy</RoadmapNode>
                            <RoadmapNode>Precision</RoadmapNode>
                            <RoadmapNode>F1-Score</RoadmapNode>
                            <RoadmapNode>Recall</RoadmapNode>
                            <RoadmapNode>ROC-AUC</RoadmapNode>
                            <RoadmapNode>Log Loss</RoadmapNode>
                        </div>
                        <RoadmapNode>Confusion Matrix</RoadmapNode>
                    </div>
                </div>
                
                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Deep Learning</RoadmapNode>

                 <div className="flex justify-center items-start gap-8 w-full mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Validation Techniques</RoadmapNode>
                        <RoadmapNode>K-Fold Cross Validation</RoadmapNode>
                        <RoadmapNode>LOOCV</RoadmapNode>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
                     <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Neural Network (NN) Basics</RoadmapNode>
                        <RoadmapNode>Perceptron, Multi-layer Perceptrons</RoadmapNode>
                        <RoadmapNode>Forward propagation</RoadmapNode>
                        <RoadmapNode>Back Propagation</RoadmapNode>
                        <RoadmapNode>Activation Functions</RoadmapNode>
                        <RoadmapNode>Loss Functions</RoadmapNode>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Deep Learning Libraries</RoadmapNode>
                        <div className="grid grid-cols-2 gap-2">
                            <RoadmapNode>TensorFlow</RoadmapNode>
                            <RoadmapNode>Keras</RoadmapNode>
                            <RoadmapNode>Scikit-learn</RoadmapNode>
                            <RoadmapNode>PyTorch</RoadmapNode>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Deep Learning Architectures</RoadmapNode>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full mt-8 space-y-4">
                  <RoadmapNode variant='primary'>Convolutional Neural Network</RoadmapNode>
                  <div className="flex justify-center gap-4">
                    <RoadmapNode>Convolution</RoadmapNode>
                    <RoadmapNode>Pooling</RoadmapNode>
                    <RoadmapNode>Padding</RoadmapNode>
                    <RoadmapNode>Strides</RoadmapNode>
                  </div>
                  <RoadmapNode variant='primary'>Applications of CNNs</RoadmapNode>
                   <div className="flex flex-col items-center space-y-2">
                      <RoadmapNode>Image & Video Recognition</RoadmapNode>
                      <RoadmapNode>Image Classification</RoadmapNode>
                      <RoadmapNode>Image Segmentation</RoadmapNode>
                      <RoadmapNode>Recommendation Systems</RoadmapNode>
                  </div>
                </div>

                <div className="flex flex-col items-center w-full mt-8 space-y-4">
                  <RoadmapNode variant='primary'>Recurrent Neural Networks</RoadmapNode>
                  <div className="flex justify-center gap-4">
                    <RoadmapNode>RNN</RoadmapNode>
                    <RoadmapNode>GRU</RoadmapNode>
                    <RoadmapNode>LSMT</RoadmapNode>
                  </div>
                </div>
                
                <div className="flex justify-around items-start w-full mt-8">
                   <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Attention Mechanisms</RoadmapNode>
                        <RoadmapNode>Self-Attention</RoadmapNode>
                        <RoadmapNode>Transformers</RoadmapNode>
                        <RoadmapNode>Multi-head Attention</RoadmapNode>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Autoencoders</RoadmapNode>
                    </div>
                </div>

                <ArrowDown className="text-gray-400 mt-4"/>
                <RoadmapNode variant='plain'>Advanced Concepts in ML</RoadmapNode>
                <div className="flex justify-center items-start gap-8 w-full mt-4">
                    <RoadmapNode>Generative Adversarial Networks</RoadmapNode>
                    <div className="flex flex-col items-center space-y-2">
                        <RoadmapNode variant='primary'>Natural Language Processing</RoadmapNode>
                        <RoadmapNode>Tokenization</RoadmapNode>
                        <RoadmapNode>Lemmatization</RoadmapNode>
                        <RoadmapNode>Embeddings</RoadmapNode>
                        <RoadmapNode>Attention Models</RoadmapNode>
                        <RoadmapNode>Stemming</RoadmapNode>
                    </div>
                    <RoadmapNode>Explainable AI</RoadmapNode>
                </div>
                
                <div className="mt-12 p-4 border rounded-lg bg-card shadow-md w-full max-w-md">
                    <p className="text-center text-sm font-semibold mb-3">Also visit the following related roadmaps</p>
                    <div className="flex justify-center gap-2">
                        <RoadmapNode variant='blue'>AI & Data Scientist</RoadmapNode>
                        <RoadmapNode variant='blue'>MLOps</RoadmapNode>
                        <RoadmapNode variant='blue'>AI Engineer</RoadmapNode>
                        <RoadmapNode variant='blue'>AI Agents</RoadmapNode>
                    </div>
                </div>

                <div className="mt-12 w-full max-w-3xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold flex items-center gap-2"><BookOpen size={20}/> Related Roadmaps</h3>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">All Roadmaps <ArrowRight size={16}/></Link>
                  </div>
                  <div className="space-y-2">
                    {relatedRoadmaps.map(roadmap => (
                      <Link href="#" key={roadmap.title} className="block p-3 rounded-lg bg-card hover:bg-muted border transition-colors">
                        <h4 className="font-semibold">{roadmap.title}</h4>
                        <p className="text-sm text-muted-foreground">{roadmap.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>

            </div>
        </main>
      </div>
    </div>
  );
}

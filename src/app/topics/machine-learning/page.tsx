
"use client";

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Type for a single roadmap item/node
type RoadmapNodeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'purple' | 'plain' | 'blue';
};

// Generic block component with variants for different colors
const RoadmapNode = ({ children, className, variant = 'default' }: RoadmapNodeProps) => {
    const baseClasses = 'text-center text-xs font-medium p-2.5 rounded-lg shadow-sm border w-full';
    const colorClasses = {
      default: 'bg-orange-100 text-orange-900 border-orange-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50',
      primary: 'bg-yellow-300 text-yellow-900 border-yellow-400/80 dark:bg-yellow-500 dark:text-yellow-950 dark:border-yellow-600',
      secondary: 'bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
      purple: 'bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-800/60',
      blue: 'bg-blue-600 text-white dark:bg-blue-700/80 shadow-lg',
      plain: 'text-center font-semibold text-gray-500 dark:text-gray-400 py-1 text-sm border-none shadow-none bg-transparent'
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
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Machine Learning Roadmap</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Step by step guide to becoming a Machine Learning Engineer in 2025</p>
        </header>

        <main className="space-y-4 flex flex-col items-center w-full">
            
            <div className="relative w-full max-w-4xl flex justify-center items-start">
                <RoadmapNode variant='primary' className="max-w-xs z-10">Introduction</RoadmapNode>
                {/* Dotted lines from Introduction */}
                <div className="absolute top-1/2 left-1/2 h-[2px] w-16 bg-repeat-x bg-[length:8px_2px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%233b82f6%27%20stroke-width%3d%274%27%20stroke-dasharray%3d%278%2c%208%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')] -translate-y-1/2 translate-x-[calc(theme(space.40)_-_2px)]"></div>
                <div className="absolute top-0 right-0 w-48 space-y-2">
                    <RoadmapNode>What is an ML Engineer?</RoadmapNode>
                    <RoadmapNode>ML Engineer vs AI Engineer</RoadmapNode>
                    <RoadmapNode>Skills and Responsibilities</RoadmapNode>
                </div>
            </div>
            
            <div className="w-px h-8 bg-blue-500 my-2"></div>
            
            <RoadmapNode variant='plain'>Mathematical Foundations</RoadmapNode>
            
            <div className="relative w-full max-w-6xl">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500 -translate-y-1/2 z-0"></div>

                <div className="relative flex justify-between items-start">
                    {/* Calculus Section */}
                    <div className="w-48 flex flex-col items-center space-y-2 z-10">
                         <RoadmapNode>Derivatives, Partial Derivatives</RoadmapNode>
                         <RoadmapNode>Chain rule of derivation</RoadmapNode>
                         <RoadmapNode>Gradient, Jacobian, Hessian</RoadmapNode>
                         <div className="w-px h-4 bg-blue-500 bg-repeat-y bg-[length:2px_8px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%233b82f6%27%20stroke-width%3d%274%27%20stroke-dasharray%3d%278%2c%208%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')]"></div>
                         <RoadmapNode variant='primary'>Calculus</RoadmapNode>
                         <div className="w-px h-12 bg-blue-500"></div>
                         <RoadmapNode variant='primary'>Discrete Mathematics</RoadmapNode>
                    </div>

                    {/* Center Section */}
                    <div className="w-48 flex flex-col items-center space-y-2 z-10">
                        <div className="w-px h-16 bg-blue-500"></div>
                        <RoadmapNode variant='primary'>Linear Algebra</RoadmapNode>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 w-px bg-blue-500 mt-2"></div>
                        <div className="mt-20 flex flex-col items-center space-y-2">
                             <RoadmapNode variant='primary'>Probability</RoadmapNode>
                             <RoadmapNode>Basics of Probability</RoadmapNode>
                             <RoadmapNode>Bayes Theorem</RoadmapNode>
                             <RoadmapNode>Random Variances, PDFs</RoadmapNode>
                             <RoadmapNode>Types of Distribution</RoadmapNode>
                        </div>
                    </div>

                    {/* Linear Algebra Sub-items */}
                    <div className="w-48 flex flex-col items-center space-y-2 z-10">
                        <RoadmapNode>Matrix & Matrix Operations</RoadmapNode>
                        <RoadmapNode>Scalars, Vectors, Tensors</RoadmapNode>
                        <RoadmapNode>Singular Value Decomposition</RoadmapNode>
                        <RoadmapNode>Determinants, inverse of Matrix</RoadmapNode>
                        <RoadmapNode>Eigenvalues, Diagonalization</RoadmapNode>
                    </div>

                     {/* Dotted lines from Linear Algebra */}
                    <div className="absolute top-[8rem] left-[calc(50%_+_6rem)]">
                        <div className="absolute top-1/2 right-full h-[2px] w-12 bg-repeat-x bg-[length:8px_2px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%233b82f6%27%20stroke-width%3d%274%27%20stroke-dasharray%3d%278%2c%208%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')] -translate-y-full"></div>
                        <div className="absolute top-1/2 right-full h-[2px] w-12 bg-repeat-x bg-[length:8px_2px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%233b82f6%27%20stroke-width%3d%274%27%20stroke-dasharray%3d%278%2c%208%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')] -translate-y-[200%]"></div>
                         <div className="absolute top-1/2 right-full h-[2px] w-12 bg-repeat-x bg-[length:8px_2px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%233b82f6%27%20stroke-width%3d%274%27%20stroke-dasharray%3d%278%2c%208%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')] translate-y-[100%]"></div>
                        <div className="absolute top-1/2 right-full h-[2px] w-12 bg-repeat-x bg-[length:8px_2px] bg-center bg-[url('data:image/svg+xml,%3csvg%20width%3d%27100%25%27%20height%3d%27100%25%27%20xmlns%3d%27http%3a//www.w3.org/2000/svg%27%3e%3crect%20width%3d%27100%25%27%20height%3d%27100%25%27%20fill%3d%27none%27%20stroke%3d%27%233b82f6%27%20stroke-width%3d%274%27%20stroke-dasharray%3d%278%2c%208%27%20stroke-linecap%3d%27square%27/%3e%3c/svg%3e')] translate-y-[200%]"></div>
                    </div>
                </div>
            </div>


            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <RoadmapNode variant='primary' className="max-w-xs">Python</RoadmapNode>
            <div className="w-px h-8 bg-blue-500 my-2"></div>
            
            <RoadmapNode variant='plain'>Programming Fundamentals</RoadmapNode>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mt-4">
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

            <div className="w-px h-8 bg-blue-500 my-2"></div>

             <div className="flex flex-col items-center space-y-2 mt-4 max-w-sm w-full">
                    <RoadmapNode variant='primary'>Essential Libraries</RoadmapNode>
                    <div className="flex gap-4 w-full">
                         <RoadmapNode>Numpy</RoadmapNode>
                         <RoadmapNode>Pandas</RoadmapNode>
                    </div>
                     <div className="flex gap-4 w-full">
                         <RoadmapNode>Matplotlib</RoadmapNode>
                         <RoadmapNode>Seaborn</RoadmapNode>
                    </div>
             </div>

             <div className="w-px h-8 bg-blue-500 my-2"></div>

            <RoadmapNode variant='plain'>Data Collection</RoadmapNode>
            <div className="flex flex-col items-center space-y-2 mt-4 max-w-sm w-full">
                <RoadmapNode variant='primary'>Data Sources</RoadmapNode>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    <RoadmapNode>Databases (SQL, No-SQL)</RoadmapNode>
                    <RoadmapNode>Internet</RoadmapNode>
                    <RoadmapNode>APIs</RoadmapNode>
                    <RoadmapNode>Mobile Apps</RoadmapNode>
                    <RoadmapNode>IoT</RoadmapNode>
                </div>
            </div>

            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <RoadmapNode variant='plain'>Data Cleaning</RoadmapNode>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mt-4">
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
            
            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <RoadmapNode variant='plain'>Machine Learning</RoadmapNode>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mt-4">
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

            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <div className="flex items-start justify-center gap-8 w-full max-w-2xl">
                <div className="flex-1 space-y-2">
                    <RoadmapNode variant='primary'>Scikit-learn</RoadmapNode>
                    <RoadmapNode>Data Loading</RoadmapNode>
                    <RoadmapNode>Train - Test Data</RoadmapNode>
                    <RoadmapNode>Data Preparation</RoadmapNode>
                    <RoadmapNode>Model Selection</RoadmapNode>
                    <RoadmapNode>Tuning</RoadmapNode>
                    <RoadmapNode>Prediction</RoadmapNode>
                </div>
            </div>
            
            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 w-full max-w-4xl">
                 <div className="flex flex-col items-center space-y-4">
                    <RoadmapNode variant='plain'>Supervised Learning</RoadmapNode>
                    <div className="flex flex-col items-center space-y-2 w-full">
                        <RoadmapNode variant='primary'>Classification</RoadmapNode>
                        <RoadmapNode>K-Nearest Neighbors (KNN)</RoadmapNode>
                        <RoadmapNode>Logistic Regression</RoadmapNode>
                        <RoadmapNode>Support Vector Machines</RoadmapNode>
                        <RoadmapNode>Decision Trees, Random Forest</RoadmapNode>
                        <RoadmapNode>Gradient Boosting Machines</RoadmapNode>
                    </div>
                     <div className="flex flex-col items-center space-y-2 w-full">
                        <RoadmapNode variant='primary'>Regression</RoadmapNode>
                        <RoadmapNode>Linear Regression</RoadmapNode>
                        <RoadmapNode>Polynomial Regression</RoadmapNode>
                        <div className="flex gap-2 w-full">
                            <RoadmapNode>Lasso</RoadmapNode>
                            <RoadmapNode>Ridge</RoadmapNode>
                        </div>
                        <RoadmapNode>ElasticNet Regularization</RoadmapNode>
                    </div>
                 </div>
                 <div className="flex flex-col items-center space-y-4">
                    <RoadmapNode variant='plain'>Unsupervised Learning</RoadmapNode>
                     <div className="flex flex-col items-center space-y-2 w-full">
                        <RoadmapNode variant='primary'>Clustering</RoadmapNode>
                        <RoadmapNode>Exclusive</RoadmapNode>
                        <RoadmapNode>Overlapping</RoadmapNode>
                        <RoadmapNode>Hierarchical</RoadmapNode>
                        <RoadmapNode>Probabilistic</RoadmapNode>
                    </div>
                    <div className="flex flex-col items-center space-y-2 w-full">
                        <RoadmapNode variant='primary'>Dimensionality Reduction</RoadmapNode>
                        <RoadmapNode>Principal Component Analysis</RoadmapNode>
                        <RoadmapNode>Autoencoders</RoadmapNode>
                    </div>
                </div>
            </div>
            
            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <RoadmapNode variant='plain'>Model Evaluation</RoadmapNode>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="flex flex-col items-center space-y-2">
                    <RoadmapNode variant='primary'>What is Reinforcement Learning?</RoadmapNode>
                    <div className="w-px h-4 bg-blue-500"></div>
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
                    <div className="grid grid-cols-2 gap-2 w-full">
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
            
            <div className="flex justify-center items-start gap-8 w-full max-w-sm mt-4">
                <div className="flex flex-col items-center space-y-2">
                    <RoadmapNode variant='primary'>Validation Techniques</RoadmapNode>
                    <RoadmapNode>K-Fold Cross Validation</RoadmapNode>
                    <RoadmapNode>LOOCV</RoadmapNode>
                </div>
            </div>

            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <RoadmapNode variant='plain'>Deep Learning</RoadmapNode>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-4">
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
                    <div className="grid grid-cols-2 gap-2 w-full">
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

            <div className="flex flex-col items-center w-full mt-8 space-y-4 max-w-sm">
              <RoadmapNode variant='primary'>Convolutional Neural Network</RoadmapNode>
              <div className="flex justify-center gap-4 w-full">
                <RoadmapNode>Convolution</RoadmapNode>
                <RoadmapNode>Pooling</RoadmapNode>
                <RoadmapNode>Padding</RoadmapNode>
                <RoadmapNode>Strides</RoadmapNode>
              </div>
              <RoadmapNode variant='primary'>Applications of CNNs</RoadmapNode>
               <div className="flex flex-col items-center space-y-2 w-full">
                  <RoadmapNode>Image & Video Recognition</RoadmapNode>
                  <RoadmapNode>Image Classification</RoadmapNode>
                  <RoadmapNode>Image Segmentation</RoadmapNode>
                  <RoadmapNode>Recommendation Systems</RoadmapNode>
              </div>
            </div>

            <div className="flex flex-col items-center w-full mt-8 space-y-4 max-w-sm">
              <RoadmapNode variant='primary'>Recurrent Neural Networks</RoadmapNode>
              <div className="flex justify-center gap-4 w-full">
                <RoadmapNode>RNN</RoadmapNode>
                <RoadmapNode>GRU</RoadmapNode>
                <RoadmapNode>LSMT</RoadmapNode>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mt-8">
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

            <div className="w-px h-8 bg-blue-500 my-2"></div>
            <RoadmapNode variant='plain'>Advanced Concepts in ML</RoadmapNode>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-4">
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
        </main>
      </div>
    </div>
  );
}

    
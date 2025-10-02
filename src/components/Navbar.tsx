import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  User,
  Settings,
  CreditCard,
  Sparkles,
  Download,
  CheckCircle2,
  History,
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  active: boolean;
}

interface NavbarProps {
  currentStep?: number;
  totalSteps?: number;
  onVideoHistoryClick?: () => void;
}

export function Navbar({
  currentStep = 1,
  totalSteps = 4,
  onVideoHistoryClick,
}: NavbarProps) {
  const handleVideoHistoryClick = () => {
    onVideoHistoryClick?.();
  };

  const steps: Step[] = [
    {
      id: 1,
      title: "Setup Video",
      icon: Settings,
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: 2,
      title: "Pembayaran",
      icon: CreditCard,
      completed: currentStep > 2,
      active: currentStep === 2,
    },
    {
      id: 3,
      title: "Generate Video",
      icon: Sparkles,
      completed: currentStep > 3,
      active: currentStep === 3,
    },
    {
      id: 4,
      title: "Download",
      icon: Download,
      completed: currentStep > 4,
      active: currentStep === 4,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4">
          {/* Top Row - Logo and Actions */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.svg"
                  alt="Instant VideoApp"
                  className="h-8 sm:h-10 md:h-12 w-auto"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Riwayat Video Button */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-3"
                onClick={handleVideoHistoryClick}
              >
                <History className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Riwayat Video</span>
                <span className="md:hidden">Riwayat</span>
              </Button>

              {/* Step Progress Info */}
              <div className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
                Langkah {currentStep} dari {totalSteps}
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Bottom Row - Progress Stepper Centered */}
          <div className="flex justify-center px-2 sm:px-4 md:px-8">
            <div className="flex items-start justify-between w-full max-w-2xl relative">
              {/* Progress Line - Perfectly centered between circles */}
              <div className="absolute top-4 sm:top-6 left-0 right-0 h-0.5 bg-border">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Steps */}
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative z-10 min-w-0"
                  >
                    {/* Step Circle */}
                    <div
                      className={`
                      flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 bg-background
                      ${
                        step.completed
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-600 text-white shadow-lg"
                          : step.active
                          ? "border-purple-600 text-purple-600 shadow-md ring-2 ring-purple-200 dark:ring-purple-800"
                          : "border-gray-300 text-gray-400 bg-gray-50 dark:border-gray-600 dark:text-gray-500 dark:bg-gray-800"
                      }
                    `}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      ) : (
                        <Icon
                          className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                            step.active ? "animate-pulse" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-2 sm:mt-3 md:mt-4 text-center max-w-16 sm:max-w-20 md:max-w-24">
                      <div
                        className={`
                        text-xs sm:text-sm font-medium transition-colors duration-300 leading-tight
                        ${
                          step.completed
                            ? "text-purple-600 font-semibold"
                            : step.active
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground"
                        }
                      `}
                      >
                        <span className="hidden sm:inline">{step.title}</span>
                        <span className="sm:hidden">
                          {step.title.split(" ")[0]}
                        </span>
                      </div>
                      {step.active && (
                        <div className="mt-1 sm:mt-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

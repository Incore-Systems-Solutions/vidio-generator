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
      <div className="container mx-auto px-8">
        <div className="py-4">
          {/* Top Row - Logo and Actions */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Badge className="px-6 py-3 text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg">
                VIDEO GENERATOR
              </Badge>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Riwayat Video Button */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-sm"
                onClick={handleVideoHistoryClick}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Riwayat Video</span>
              </Button>

              {/* Step Progress Info */}
              <div className="text-sm text-muted-foreground font-medium">
                Langkah {currentStep} dari {totalSteps}
              </div>
              <ThemeToggle />
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Bottom Row - Progress Stepper Centered */}
          <div className="flex justify-center px-8">
            <div className="flex items-start justify-between w-full max-w-2xl relative">
              {/* Progress Line - Perfectly centered between circles */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border">
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
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 bg-background
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
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon
                          className={`w-5 h-5 ${
                            step.active ? "animate-pulse" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-4 text-center max-w-24">
                      <div
                        className={`
                        text-sm font-medium transition-colors duration-300 leading-tight
                        ${
                          step.completed
                            ? "text-purple-600 font-semibold"
                            : step.active
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground"
                        }
                      `}
                      >
                        {step.title}
                      </div>
                      {step.active && (
                        <div className="mt-2 w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto animate-pulse" />
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

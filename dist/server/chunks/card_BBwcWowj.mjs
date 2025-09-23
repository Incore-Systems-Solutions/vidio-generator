import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Moon, Sun, History, Menu, Settings, CreditCard, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggleTheme,
      className: "w-10 h-10",
      "aria-label": "Toggle theme",
      children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" })
    }
  );
}

function Navbar({
  currentStep = 1,
  totalSteps = 4,
  onVideoHistoryClick
}) {
  const handleVideoHistoryClick = () => {
    onVideoHistoryClick?.();
  };
  const steps = [
    {
      id: 1,
      title: "Setup Video",
      icon: Settings,
      completed: currentStep > 1,
      active: currentStep === 1
    },
    {
      id: 2,
      title: "Pembayaran",
      icon: CreditCard,
      completed: currentStep > 2,
      active: currentStep === 2
    },
    {
      id: 3,
      title: "Generate Video",
      icon: Sparkles,
      completed: currentStep > 3,
      active: currentStep === 3
    },
    {
      id: 4,
      title: "Download",
      icon: Download,
      completed: currentStep > 4,
      active: currentStep === 4
    }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-8", children: /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Badge, { className: "px-6 py-3 text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg", children: "VIDEO GENERATOR" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "flex items-center space-x-2 text-sm",
            onClick: handleVideoHistoryClick,
            children: [
              /* @__PURE__ */ jsx(History, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Riwayat Video" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground font-medium", children: [
          "Langkah ",
          currentStep,
          " dari ",
          totalSteps
        ] }),
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-10 h-10 lg:hidden",
            children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between w-full max-w-2xl relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-0 right-0 h-0.5 bg-border", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out",
          style: {
            width: `${(currentStep - 1) / (totalSteps - 1) * 100}%`
          }
        }
      ) }),
      steps.map((step, index) => {
        const Icon = step.icon;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col items-center relative z-10 min-w-0",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 bg-background
                      ${step.completed ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-600 text-white shadow-lg" : step.active ? "border-purple-600 text-purple-600 shadow-md ring-2 ring-purple-200 dark:ring-purple-800" : "border-gray-300 text-gray-400 bg-gray-50 dark:border-gray-600 dark:text-gray-500 dark:bg-gray-800"}
                    `,
                  children: step.completed ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(
                    Icon,
                    {
                      className: `w-5 h-5 ${step.active ? "animate-pulse" : ""}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center max-w-24", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `
                        text-sm font-medium transition-colors duration-300 leading-tight
                        ${step.completed ? "text-purple-600 font-semibold" : step.active ? "text-foreground font-semibold" : "text-muted-foreground"}
                      `,
                    children: step.title
                  }
                ),
                step.active && /* @__PURE__ */ jsx("div", { className: "mt-2 w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto animate-pulse" })
              ] })
            ]
          },
          step.id
        );
      })
    ] }) })
  ] }) }) });
}

function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}

export { Button as B, Card as C, Navbar as N, CardHeader as a, CardTitle as b, CardContent as c, Badge as d, cn as e };

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface FilterOption {
  id: string
  label: string
  isActive?: boolean
}

interface FilterSectionProps {
  title: string
  icon: React.ReactNode
  options: FilterOption[]
  onOptionClick: (optionId: string) => void
}

export function FilterSection({ 
  title, 
  icon, 
  options, 
  onOptionClick 
}: FilterSectionProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-6">
          {/* Title Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
            </div>
          </div>
          
          {/* Separator */}
          <div className="h-6 w-px bg-border" />
          
          {/* Options Section */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {options.map((option) => (
              <Button
                key={option.id}
                variant={option.isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onOptionClick(option.id)}
                className={`
                  relative transition-all duration-200 flex-shrink-0
                  ${option.isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md' 
                    : 'hover:border-purple-300 hover:text-purple-600'
                  }
                `}
              >
                {option.isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  </div>
                )}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

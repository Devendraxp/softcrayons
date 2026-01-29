import * as React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className }: TabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-border mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={cn(
              'px-6 py-2 font-semibold text-sm transition-colors duration-200 border-b-2 -mb-px',
              idx === activeIndex
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-primary/80'
            )}
            onClick={() => setActiveIndex(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}

interface TabRowsProps {
  data: { title: string; description: string }[];
}

export function TabRows({ data }: TabRowsProps) {
  return (
    <div className="space-y-3">
      {data.map((row, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow"
        >
          <div className="font-bold text-lg text-foreground mb-1 md:mb-0">{row.title}</div>
          <div className="text-muted-foreground text-sm">{row.description}</div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { Typography } from "@/shared/components/typography/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useState } from "react";

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabsComponentProps = {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  onTabChange?: (value: string) => void;
};

export function AdminTabs({
  tabs,
  defaultTab,
  className = "",
  onTabChange,
}: TabsComponentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-full"
    >
      <TabsList className="w-full h-14 bg-light-dark/50 dark:bg-dark-light">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-1 h-full"
          >
            <Typography element="h4" variant="menu-text">
              {tab.label}
            </Typography>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

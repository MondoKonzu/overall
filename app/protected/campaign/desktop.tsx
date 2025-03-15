"use client";

import React, { useContext, useState, createContext } from 'react';

// Define the type for the app object
type App = {
  appID: string | number;
  appName: string;
  status: "open" | "hidden" | "close";
  zIndex: number;
};

// Define the context value type
type DesktopContextValue = {
  apps: App[];
  addApp: (appName: string, status: "open" | "hidden" | "close", id: string | number) => number | undefined;
  activeApp: (appID: number | string) => void;
  getZindex: (appID: number | string) => number;
};

// Create the context with a default value
export const DesktopContext = createContext<DesktopContextValue>({
  apps: [],
  addApp: () => {
    console.warn("addApp called without a provider!");
    return 0;
  },
  activeApp: () => {
    console.warn("activeApp called without a provider!");
  },
  getZindex: () => {
    console.warn("getZindex called without a provider!");
    return 0;
  }
});

const DesktopSim = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);
  let addedApp = 0;

  const getMaxIndex = () => {
    apps.map(item => item.zIndex).sort((a, b) => b - a);
    return addedApp;
  }

  const addApp = (appName: string, status: "open" | "hidden" | "close", id: string | number) => {
    let ind = getMaxIndex();
    addedApp++;
    const newApp: App = {
      appID: id,
      appName: appName,
      status: status,
      zIndex: ind, // Set the initial zIndex to the current number of apps
    };
    if(apps.find(app => app.appID === id)) {return undefined}
    console.log(ind)
    setApps((prev) => [...prev, newApp]);
    return newApp.zIndex;
  };

  const activeApp = (appID: number | string) => {
    setApps((prev) => {
      const sorted = [...prev].sort((a, b) => b.zIndex - a.zIndex);
      console.log(apps)
      const max = sorted[0].zIndex;
      if(sorted[0].appID == appID) {
        return sorted
      }
      return sorted.map((item, index) => ({
        ...item,
        zIndex: item.appID === appID ? max: item.zIndex-1,
      }));
    });
  };
  
  const getZindex = (appID: number | string) => {
    const app = apps.find((app) => app.appID === appID);
    if(app === undefined){
      return 0
    }else{
      return app.zIndex;
    }
  }

  const contextValue: DesktopContextValue = {
    apps,
    addApp,
    activeApp,
    getZindex
  };

  return (
    <DesktopContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </DesktopContext.Provider>
  );
};

export default DesktopSim;
export const useDesktop = () => useContext(DesktopContext);
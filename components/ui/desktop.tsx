"use client";

import Image from 'next/image';
import React, { useContext, useState, createContext } from 'react';

type App = {
  appID: string;
  appName: string;
  status: "open" | "hidden" | "close";
  zIndex: number;
  icon: string;
};

type DesktopContextValue = {
  apps: App[];
  addApp: (icon: string,appName: string, status: "open" | "hidden" | "close", id: string) => string;
  activeApp: (appID: string) => void;
  getZindex: (appID: string) => number;
  updateAppStatus: (appID: string, status: "open" | "hidden" | "close") => void // Add this
  getAppStatus: (appID: string) => "open" | "hidden" | "close";
};

export const DesktopContext = createContext<DesktopContextValue>({
  apps: [],
  addApp: () => {
    console.warn("addApp called without a provider!");
    return "0";
  },
  activeApp: () => {
    console.warn("activeApp called without a provider!");
  },
  getZindex: () => {
    console.warn("getZindex called without a provider!");
    return 0;
  },
  updateAppStatus: () => { 
    console.warn("updateAppStatus called without a provider!");
  },
  getAppStatus : () => {
    console.warn("getAppStatus called without a provider!");
    return "close";
  }
});

const DesktopSim = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);
  let addedApp = 0;

  const getMaxIndex = () => {
    apps.map(item => item.zIndex).sort((a, b) => b - a);
    return addedApp;
  }

  const addApp = (icon : string, appName: string, status: "open" | "hidden" | "close", id: string) => {
    const appID = id || `${appName}-${Date.now()}`;
    
    setApps(prevApps => {
      // Prevent duplicates
      if (prevApps.some(app => app.appID === appID)) {
        return prevApps;
      }
      let ind = getMaxIndex()
      const newApp: App = {
        appID,
        appName,
        status,
        zIndex: ind,
        icon
      };
      
      return [...prevApps, newApp];
    });
    
    return appID;
  };

  const activeApp = (appID: number | string) => {
    setApps((prev) => {
      const sorted = [...prev].sort((a, b) => b.zIndex - a.zIndex);
      let max = sorted[0].zIndex;
      if(max < apps.length){max = apps.length}
      if(sorted[0].appID == appID) {
        return sorted
      }
      return sorted.map((item, index) => ({
        ...item,
        zIndex: item.appID === appID ? max : (item.zIndex == 0 ? item.zIndex : item.zIndex-1),
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

  const updateAppStatus = (appID: string, status: "open" | "hidden" | "close") => {
    setApps(prevApps => 
      prevApps.map(app => 
        app.appID === appID ? { ...app, status } : app
      )
    );
    return status;
  };

  const getAppStatus = (appID: string) => {
    let app = apps.find(app => app.appID === appID);
    return app !== undefined ? app.status : "close";
  }

  const contextValue: DesktopContextValue = {
    apps,
    addApp,
    activeApp,
    getZindex,
    updateAppStatus,
    getAppStatus
  };

  const show = apps.filter(app => app.status != "close").map(app => 
    <div key={app.appID} onClick={()=> {updateAppStatus(app.appID, "open")}}>
      <Image src={app.icon} alt={app.appName} width={30} height={30} />
    </div>)

  return (
    <DesktopContext.Provider value={contextValue}>
      <div>
        <div className={"min-w-[100vw] min-h-[100vh]"}>
          <div className={className}>
            {children}
          </div>
          <div className='absolute bottom-0 flex gap-2 place-content-center pt-2 min-w-[100vw] min-h-10 bg-zinc-600/40 '>
            {show}
          </div>
        </div>
      </div>
    </DesktopContext.Provider>
  );
};

export default DesktopSim;
export const useDesktop = () => useContext(DesktopContext);
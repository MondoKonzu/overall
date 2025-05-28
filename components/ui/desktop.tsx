"use client";

import { cn } from '@/lib/utils';
import { Building2, Users } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState, createContext, useEffect } from 'react';

type App = {
  appID: string;
  appName: string;
  status: "open" | "hidden" | "close";
  zIndex: number;
  icon: string | React.ReactNode;
};

type DesktopContextValue = {
  apps: App[];
  addApp: (icon: string | React.ReactNode, appName: string, status: "open" | "hidden" | "close", id: string) => string;
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
  getAppStatus: () => {
    console.warn("getAppStatus called without a provider!");
    return "close";
  }
});

const DesktopSim = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);
  let addedApp = 1;

  const getMaxIndex = () => {
    apps.map(item => item.zIndex).sort((a, b) => b - a);
    return addedApp;
  }

  const addApp = (icon: string | React.ReactNode, appName: string, status: "open" | "hidden" | "close", id: string) => {
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
      if (max < apps.length) { max = apps.length }
      if (sorted[0].appID == appID) {
        return sorted
      }
      return sorted.map((item, index) => ({
        ...item,
        zIndex: item.appID === appID ? max : (item.zIndex == 1 ? item.zIndex : item.zIndex - 1),
      }));
    });
  };

  const getZindex = (appID: number | string) => {
    const app = apps.find((app) => app.appID === appID);
    if (app === undefined) {
      return 0
    } else {
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
    <div key={app.appID} onClick={() => {
      let t = getAppStatus(app.appID);
      t == 'hidden' ? updateAppStatus(app.appID, "open")
        : updateAppStatus(app.appID, "hidden");
    }}
      className="h-10 w-10 my-1 flex place-content-center p-1
          bg-gray-500/30 hover:bg-gray-500/50 duration-100 hover:p-0.5"
    >
      {
        typeof app.icon == "string" ?
          <Image src={app.icon} alt={app.appName} width={40} height={30} />
          :
          <>
            {app.icon}
          </>
      }
    </div>)

  return (
    <DesktopContext.Provider value={contextValue}>
      <div>
        <div className={"min-w-[100vw] min-h-[100vh]"}>
          <div className={cn("grid grid-cols-6 md:grid-cols-12 gap-8 p-8", className)}>
            {children}
          </div>
          <div
            className='absolute bottom-0 flex gap-2 justify-center min-w-[100vw] min-h-12 bg-zinc-600/70 backdrop-blur-sm z-0'>
            {show}
          </div>
        </div>
      </div>
    </DesktopContext.Provider>
  );
};

export const BuildingAppIcon = ({color1 = "red" , color2 = "orange"} : {color1?: string, color2?: string}) => {
  const [angle, setAngle] = useState<number>(0);
  const trigger = () => {
    let add = angle == 0
    let c = 0
    let interval = setInterval(() => {
      add ? setAngle(prev => prev + 3) : setAngle(prev => prev - 3)
      c++
      if (c == 60) {
        clearInterval(interval)
      }
    }, 1)
  }
  return (
    <div
      onMouseOver={trigger}
      onMouseOut={trigger}
      className="w-10 h-10"
      style={{
        WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor'
    stroke-width='2' stroke-linecap='round' stroke-linejoin='round'
    class='lucide lucide-building2-icon lucide-building-2'>
    <path d='M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z' />
    <path d='M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2' />
    <path d='M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2' />
    <path d='M10 6h4' />
    <path d='M10 10h4' />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
</svg>
        `)}")`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        animationDuration: "500",
        backgroundImage: `conic-gradient(from ${angle}deg at 50% -5%,${color1},${color2} 50%,${color1})`
      }}
    />
  )
}


export const PartyAppIcon = ({color1 = "cyan" , color2 = "blue"} : {color1?: string, color2?: string}) => {
  let defPerc = 0
  const [perc, setPerc] = useState<number>(defPerc);
  const trigger = () => {
    let add = perc == defPerc
    let c = 0
    let interval = setInterval(() => {
      add ? setPerc(prev => prev + 5) : setPerc(prev => prev - 5)
      c++
      if (c == 20) {
        clearInterval(interval)
      }
    }, 10)
  }
  const notPerc = () => {return 100 - perc}
  return (
    <div
      onMouseOver={trigger}
      onMouseOut={trigger}
      className="w-10 h-10"
      style={{
        WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(`
 <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor'
     stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-users-icon lucide-users'>
     <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
     <path d='M16 3.128a4 4 0 0 1 0 7.744' />
     <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
     <circle cx='9' cy='7' r='4' />
 </svg>
         `)}")`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        backgroundImage: `linear-gradient(${color1} ${perc}%,${color2} ${notPerc()}%)`
      }}
    />
  )
}


export default DesktopSim;
export const useDesktop = () => useContext(DesktopContext);
"use client"

import { cn } from '@/lib/utils';
import clsx from 'clsx';
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';

export type Tab = {
    trigger: string | React.ReactNode;
    body: React.ReactNode;
    className?: string;
    isActive?: boolean;
    triggerClass?: string
    trigActiveClass?: string
}

const Tabs = ({ children, className }: { children: Tab[], className?: string }) => {
    const getActive = (): number => {
        let ans = children.findIndex(item => item.isActive);
        ans == -1 && (ans = 0);
        return ans;
    }
    const [activeTab, setActiveTab] = useState<number | null>(getActive);
    const tabChange = (e: HTMLElement) => {
        let tn: any = e.getAttribute("data-tab");
        tn = parseInt(tn!);
        setActiveTab(tn);
    }
    return (
        <div className={cn("w-full dark:bg-black border rounded-md p-3 grid gap-2", className)}  >
            <div className='flex gap-2 p-1'>
                {children.map((trig, index) =>
                    <div
                        className={cn(
                            `rounded py-1 px-1.5 cursor-pointer 
                    ${activeTab == index && cn("bg-slate-700", trig.trigActiveClass)}`,
                        trig.triggerClass
                        )}
                        data-tab={index}
                        key={index}
                        onClick={(e) => { tabChange(e.currentTarget) }}
                    >{trig.trigger}</div>)}
            </div>
            <div>
                {children.filter((trig, index) => index == activeTab)
                    .map((trig, index) =>
                        <div
                            className={cn('rounded-lg border p-2', trig.className)}
                            data-tab={index}
                            key={index}
                        >
                            {trig.body}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Tabs
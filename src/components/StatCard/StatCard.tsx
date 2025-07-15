// src/components/StatCard.tsx
import { useRouter } from 'next/navigation';
import React from 'react';

interface StatCardProps {
    colorClass: string;
    title: string;
    value: number | string;
    urlPath: string;
}

export const StatCard: React.FC<StatCardProps> = ({ colorClass, title, value, urlPath }) => {
    const router = useRouter();
    return (
        <div className={`${colorClass} p-4
        rounded-2xl
        shadow-lg
        aspect-square          
        flex flex-col          
        justify-center       
        items-center cursor-pointer `}
            onClick={() => router.push(urlPath)} >
            <h3 className="text-white text-4xl font-medium">{title}</h3>
            <p className="text-white text-8xl font-bold mt-2">{value}</p>
        </div >
    );
};



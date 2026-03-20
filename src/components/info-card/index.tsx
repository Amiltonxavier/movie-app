import React from 'react';

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}

export const InfoCard = ({ title, children }: InfoCardProps) => {
    return (
        <div className="p-4 md:p-6 backdrop-blur-xl bg-white/70 rounded-xl shadow-sm border border-white/20 flex flex-col gap-3 md:gap-4 transition-all hover:shadow-md">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
                {title}
            </h3>
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </div>
    );
};


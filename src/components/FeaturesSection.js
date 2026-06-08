import React from 'react';
import { Zap, Wand2, Globe } from 'lucide-react';

const features = [
    {
        icon: Zap,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-500',
        iconRing: 'group-hover:bg-indigo-200',
        title: "Lightning fast",
        description: "Get your captions in minutes, not hours. Our AI processes videos quickly and efficiently."
    },
    {
        icon: Wand2,
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-500',
        iconRing: 'group-hover:bg-emerald-200',
        title: "Smart editing",
        description: "Easy-to-use interface for reviewing and editing auto-generated captions."
    },
    {
        icon: Globe,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-500',
        iconRing: 'group-hover:bg-purple-200',
        title: "Multi-language",
        description: "Support for over 30 languages with automatic language detection."
    }
];

export function FeaturesSection() {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map(({ icon: Icon, iconBg, iconColor, iconRing, title, description }, index) => (
                    <div
                        key={index}
                        className="group relative rounded-2xl p-6 cursor-default
                                   transition-all duration-300 ease-out
                                   hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-100/40"
                        style={{
                            background: 'rgba(255, 255, 255, 0.38)',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.62)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.38)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                        }}
                    >
                        {/* Subtle top accent line on hover */}
                        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-300/0 to-transparent
                                        group-hover:via-indigo-300/60 transition-all duration-300 rounded-full" />

                        {/* Icon */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5
                                         transition-all duration-300 ${iconBg} ${iconRing}`}>
                            <Icon
                                size={20}
                                strokeWidth={1.75}
                                className={`${iconColor} transition-transform duration-300 group-hover:scale-110`}
                            />
                        </div>

                        {/* Text */}
                        <h3 className="text-base font-semibold text-gray-900 mb-2
                                       transition-colors duration-300 group-hover:text-indigo-700">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed
                                      transition-colors duration-300 group-hover:text-gray-600">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
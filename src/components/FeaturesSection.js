import React from 'react';
import { Zap, Wand2, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6 drop-shadow-lg hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-4">
                <div className="text-gray-800">
                    <Icon  size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-base">{description}</p>
            </div>
        </div>
    );
};

export function FeaturesSection(){
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Get your captions in minutes, not hours. Our AI processes videos quickly and efficiently."
        },
        {
            icon: Wand2,
            title: "Smart Editing",
            description: "Easy-to-use interface for reviewing and editing auto-generated captions."
        },
        {
            icon: Globe,
            title: "Multi-language",
            description: "Support for over 30 languages with automatic language detection."
        }
    ];

    return (
        <section className="w-full mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </section>
    );
};

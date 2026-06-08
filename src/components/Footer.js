import React from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="relative z-10 w-full"
            style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255,255,255,0.75)'
            }}>
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10 py-5
                            flex flex-col items-center gap-4
                            md:flex-row md:justify-between md:gap-0">

                {/* Logo */}
                <a href="/" className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] flex items-center justify-center">
                        <Image src="/logo.png" alt="PhrasePop logo" width={18} height={18} className="invert" />
                    </div>
                    <span className="text-base font-semibold text-gray-800">PhrasePop</span>
                </a>

                {/* Social icons — center on all sizes */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/Pragyan14" target="_blank" rel="noreferrer"
                       className="text-gray-400 hover:text-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" className="fill-current">
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/pragyanpatidar/" target="_blank" rel="noreferrer"
                       className="text-gray-400 hover:text-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" className="fill-current">
                            <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/pragyan-patidar/" target="_blank" rel="noreferrer"
                       className="text-gray-400 hover:text-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50" className="fill-current">
                            <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>
                        </svg>
                    </a>
                </div>

                {/* Crafted by — stacks under on mobile */}
                <div className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0">
                    Crafted with
                    <Heart className="w-3.5 h-3.5 text-red-400 mx-0.5" fill="#f87171" />
                    by
                    <a href="https://github.com/Pragyan14" target="_blank" rel="noreferrer"
                       className="text-gray-700 font-medium hover:underline mx-1">Pragyan</a>
                    · © {new Date().getFullYear()}
                </div>

            </div>
        </footer>
    );
}
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
	mode: string;
	setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState();

	const handleThemeChange = () => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			// @ts-ignore
			setMode('dark');
			document.documentElement.classList.add('dark');
		} else {
			// @ts-ignore
			setMode('light');
			document.documentElement.classList.remove('dark');
		}
	};

	useEffect(() => {
		handleThemeChange();
	}, [mode]);

	return (
		// @ts-ignore
		<ThemeContext.Provider value={{ mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined)
		throw new Error('useTheme must be used within the ThemeProvider');
	return context;
}

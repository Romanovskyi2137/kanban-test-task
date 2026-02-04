import { create } from 'zustand'

import { type RecentBoard, getRecentBoards } from '@utils/storage'

interface AppState {
	isSidebarOpen: boolean
	toggleSidebar: () => void
	closeSidebar: () => void
	searchQuery: string
	setSearchQuery: (query: string) => void
	recentBoards: RecentBoard[]
	setRecentBoards: (boards: RecentBoard[]) => void
}

export const useAppStore = create<AppState>(set => ({
	isSidebarOpen: false,
	toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
	closeSidebar: () => set({ isSidebarOpen: false }),
	searchQuery: '',
	setSearchQuery: query => set({ searchQuery: query }),
	recentBoards: getRecentBoards(),
	setRecentBoards: boards => set({ recentBoards: boards })
}))

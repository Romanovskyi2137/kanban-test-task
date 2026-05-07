import { create } from 'zustand'

import { type RecentBoard, getRecentBoards } from '@utils/storage'

interface AppState {
	isSidebarOpen: boolean
	toggleSidebar: () => void
	closeSidebar: () => void
	recentBoards: RecentBoard[]
	setRecentBoards: (boards: RecentBoard[]) => void
	errorToast: string | null
	setErrorToast: (message: string | null) => void
}

export const useAppStore = create<AppState>(set => ({
	isSidebarOpen: false,
	toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
	closeSidebar: () => set({ isSidebarOpen: false }),
	recentBoards: getRecentBoards(),
	setRecentBoards: boards => set({ recentBoards: boards }),
	errorToast: null,
	setErrorToast: message => set({ errorToast: message })
}))

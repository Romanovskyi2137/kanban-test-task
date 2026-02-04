import { type ReactNode } from 'react'

import { useAppStore } from '@store/useAppStore'

import styles from './Sidebar.module.scss'

interface SidebarProps {
	children?: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
	const { isSidebarOpen, toggleSidebar, closeSidebar } = useAppStore()

	return (
		<>
			<button
				className={`${styles.hamburger} ${isSidebarOpen ? styles.active : ''}`}
				onClick={toggleSidebar}
			>
				<span />
				<span />
				<span />
			</button>

			{isSidebarOpen && (
				<div
					className={styles.overlay}
					onClick={closeSidebar}
				/>
			)}

			<aside
				className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
			>
				<div className={styles.inner}>{children}</div>
			</aside>
		</>
	)
}

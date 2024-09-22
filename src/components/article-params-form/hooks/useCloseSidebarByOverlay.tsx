import { useEffect } from 'react';

type TCloseSidebarByOverlay = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>;
	onClose: (value: boolean) => void;
};

export const useCloseSidebarByOverlay = ({
	isOpen,
	rootRef,
	onClose,
}: TCloseSidebarByOverlay) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (
				isOpen &&
				rootRef.current &&
				!rootRef.current?.contains(event.target as Node)
			) {
				onClose(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, isOpen]);
};

import React from 'react';
import Main from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleLoading } from '../../store/features/app';

const Backdrop = () => {
	const dispatch = useAppDispatch();
	const [loading] = useAppSelector((state) => [state.app.loading]);

	const handleClose = () => {
		dispatch(toggleLoading(false));
	};

	return (
		<Main
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
			onClick={handleClose}
		>
			<CircularProgress color='inherit' />
		</Main>
	);
};

export default Backdrop;

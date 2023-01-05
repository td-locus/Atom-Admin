import React from 'react';
import Main from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { hideMessage } from '../../store/features/app';

const Snackbar = () => {
	const dispatch = useAppDispatch();
	const [open, severity, message] = useAppSelector((state) => [
		state.app.snackbar.open,
		state.app.snackbar.severity,
		state.app.snackbar.message,
	]);

	const handleClose = () => {
		dispatch(hideMessage());
	};

	return (
		<Main open={open} autoHideDuration={6000} onClose={handleClose}>
			<MuiAlert
				onClose={handleClose}
				severity={severity}
				sx={{ width: '100%' }}
			>
				{message}
			</MuiAlert>
		</Main>
	);
};

export default Snackbar;

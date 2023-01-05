import React from 'react';
import './App.css';
import Snackbar from './components/reusable/Snackbar';
import { BrowserRouter } from 'react-router-dom';
import Backdrop from './components/reusable/Backdrop';
import AppRoutes from './routes/AppRoutes';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
			<Snackbar />
			<Backdrop />
		</div>
	);
}

export default App;

import store from '../store';
import { useDispatch } from 'react-redux';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

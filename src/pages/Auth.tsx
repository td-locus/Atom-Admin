import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
// import { Link } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import GoogleIcon from '../assets/google-icon.png';
import { Divider } from '@mui/material';
import server from '../utils/axios';
import { loginAdmin } from '../store/features/user';
import { toggleLoading, showMessage } from '../store/features/app';
import { useAppDispatch } from '../hooks/useAppDispatch';
import configuration from '../config';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a color="inherit" href="https://think-digital.in" className="text-blue-500 underline hover:text-blue-600">
                Think-Digital
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Auth() {
    const dispatch = useAppDispatch();
    const [input, setInput] = useState({
        email: '',
        password: '',
    });
    const [viewPassword, setViewPassword] = useState(false);

    const handleInput = (prop: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(prev => {
            return {
                ...prev,
                [prop]: e.target.value,
            };
        });
    };

    const handleEmailAndPasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(toggleLoading(true));
            const response = await server<
                { email: string; password: string },
                {
                    message: string;
                    admin: Admin;
                    token: string;
                }
            >({
                url: '/api/admin/auth/login',
                method: 'post',
                data: { ...input },
            });
            if (response.data.message === 'admin/email-password-login-successful') {
                dispatch(showMessage({ message: 'Login Successful!', severity: 'success' }));
                dispatch(loginAdmin(response.data));
            }
        } catch (error) {
            // @ts-ignore
            if (error.data.message === 'admin/invalid-email') {
                dispatch(showMessage({ message: 'Account with given email does not exist' }));
                // @ts-ignore
            } else if (error.data.message === 'admin/unauthorized-access') {
                dispatch(showMessage({ message: 'You do not have access to the Admin Platform!' }));
                // @ts-ignore
            } else if (error.data.message === 'admin/google-login-required') {
                dispatch(showMessage({ message: 'Use Google to Login' }));
                // @ts-ignore
            } else if (error.data.message === 'admin/invalid-password') {
                dispatch(showMessage({ message: 'Invalid Password! Try again' }));
            } else {
                dispatch(showMessage({ message: 'Something went wrong!' }));
            }
        } finally {
            dispatch(toggleLoading(false));
        }
    };

    const handleGoogleLogin = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        try {
            dispatch(toggleLoading(true));
            const { accessToken, profileObj } = res as GoogleLoginResponse;
            sessionStorage.setItem(configuration.CLIENT_STORAGE_KEYS.GOOGLE_ACCESS_TOKEN, accessToken);
            const response = await server<{ email: string }, { message: string; admin: Admin; token: string }>({
                url: '/api/admin/auth/login/google',
                method: 'post',
                data: { email: profileObj.email },
            });
            if (response.data.message === 'admin/google-login-successful') {
                dispatch(showMessage({ message: 'Login Successful!', severity: 'success' }));
                dispatch(loginAdmin(response.data));
            }
        } catch (error) {
            // @ts-ignore
            if (error.data.message === 'admin/invalid-email') {
                dispatch(showMessage({ message: 'Account with given email does not exist' }));
                // @ts-ignore
            } else if (error.data.message === 'admin/unauthorized-access') {
                dispatch(showMessage({ message: 'You do not have access to the Admin Platform!' }));
                // @ts-ignore
            } else {
                dispatch(showMessage({ message: 'Something went wrong!' }));
            }
        } finally {
            dispatch(toggleLoading(false));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in | Atom Admin
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleEmailAndPasswordLogin} sx={{ mt: 1 }}>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_CLIENT_ID!}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <div className="mt-3 w-full">
                                        <button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            className="flex w-full cursor-pointer items-center justify-center rounded-4xl border border-gray-300 py-4 font-semibold transition-all hover:border-gray-400 hover:bg-gray-50">
                                            <img src={GoogleIcon} alt="Google Icon" className="mr-1 h-5 w-5" /> Sign in with Google
                                        </button>
                                    </div>
                                )}
                                onSuccess={handleGoogleLogin}
                                onFailure={() => {
                                    dispatch(showMessage({ message: 'Unable to login, try again.' }));
                                }}
                            />
                            <Divider sx={{ my: 4 }}>OR</Divider>
                            <TextField margin="normal" required fullWidth label="Email Address" autoComplete="email" autoFocus onChange={handleInput('email')} value={input.email} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type={viewPassword ? 'text' : 'password'}
                                onChange={handleInput('password')}
                                value={input.password}
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: <IconButton onClick={() => setViewPassword(!viewPassword)}>{viewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>,
                                }}
                            />
                            <button type="submit" className="w-full transition-all text-center cursor-pointer bg-primary py-4 rounded-4xl my-4 hover:bg-primary-dark text-white uppercase">
                                Sign In
                            </button>
                            <Grid container className="text-left">
                                <Grid item xs>
                                    {/* <Link to="/forgot-password" className="text-blue-500 underline hover:text-blue-600">
                                        Forgot password?
                                    </Link> */}
                                    <MuiLink href="https://atom.think-digital.in/auth/reset" target="_blank" className="text-blue-500 underline hover:text-blue-600">
                                        Forgot Password?
                                    </MuiLink>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

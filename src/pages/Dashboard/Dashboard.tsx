import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Groups2Icon from '@mui/icons-material/Groups2';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DomainIcon from '@mui/icons-material/Domain';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logoutAdmin } from '../../store/features/user';
import { toggleLoading, showMessage } from '../../store/features/app';

const primaryNav = [
    {
        name: 'Dashboard',
        Icon: DashboardIcon,
        path: '/dashboard/',
    },
    {
        name: 'Users',
        Icon: Groups2Icon,
        path: '/dashboard/users',
    },
    {
        name: 'Groups',
        Icon: WorkspacesIcon,
        path: '/dashboard/groups',
    },
    {
        name: 'Tasks',
        Icon: AssignmentIcon,
        path: '/dashboard/tasks',
    },
    {
        name: 'Events',
        Icon: EventIcon,
        path: '/dashboard/events',
    },
    {
        name: 'Domains',
        Icon: DomainIcon,
        path: '/dashboard/domains',
    },
    {
        name: 'Profile',
        Icon: AccountCircleIcon,
        path: '/dashboard/me',
    },
];

const secondaryNav = [
    {
        name: 'Repository',
        Icon: GitHubIcon,
        url: 'https://github.com/td-locus',
    },
];

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

function DashboardContent() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        dispatch(toggleLoading(true));
        setTimeout(() => {
            dispatch(logoutAdmin());
            dispatch(showMessage({ message: 'Logout Successful!', severity: 'success' }));
            dispatch(toggleLoading(false));
        }, 2000);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Atom Admin | Dashboard
                        </Typography>
                        <Box>
                            {/* <IconButton color="inherit" disabled={true}>
                                <Badge color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                            <IconButton onClick={() => navigate('/dashboard/me')}>
                                <Tooltip title="My Profile">
                                    <AccountCircleIcon />
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav" className="flex flex-col items-start justify-start w-full">
                        {primaryNav.map((item, index) => (
                            <ListItemButton key={index} onClick={() => navigate(item.path)} className="w-full">
                                <ListItemIcon>
                                    <item.Icon />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ))}
                        <Divider sx={{ my: 1, width: '100%', mx: 0 }} variant="inset" component={'li'} />
                        {secondaryNav.map((item, index) => (
                            <ListItemButton key={index} href={item.url} target="_blank" className="w-full">
                                <ListItemIcon>
                                    <item.Icon />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ))}
                        <ListItemButton className="mt-auto w-full" onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItemButton>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}>
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}

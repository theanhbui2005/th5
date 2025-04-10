export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user/login',
                layout: false,
                name: 'login',
                component: './user/Login',
            },
            {
                path: '/user',
                redirect: '/user/login',
            },
        ],
    },

    ///////////////////////////////////
    // DEFAULT MENU
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: './TrangChu',
        icon: 'HomeOutlined',
    },
    {
        path: '/gioi-thieu',
        name: 'About',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/random-user',
        name: 'RandomUser',
        component: './RandomUser',
        icon: 'ArrowsAltOutlined',
    },

    ///////////////////////////////////
    // QUẢN LÝ CÂU LẠC BỘ
    {
        path: '/club-management',
        name: 'Club Management',
        icon: 'TeamOutlined',
        routes: [
            {
                path: '/club-management/members',
                name: 'Members',
                component: './ClubManagement/Members',
                icon: 'UserOutlined',
            },
            {
                path: '/club-management/statistics',
                name: 'Statistics',
                component: './ClubManagement/Statistics',
                icon: 'BarChartOutlined',
            },
        ],
    },

    ///////////////////////////////////
    // REPORTS
    {
        path: '/reports',
        name: 'Reports',
        icon: 'BarChartOutlined',
        routes: [
            {
                path: '/reports/statistics',
                name: 'Statistics',
                component: './Reports/Statistics',
            },
        ],
    },

    ///////////////////////////////////
    // EXCEPTION HANDLING
    {
        path: '/',
    },
    {
        path: '/403',
        component: './exception/403/403Page',
        layout: false,
    },
    {
        path: '/hold-on',
        component: './exception/DangCapNhat',
        layout: false,
    },
    {
        component: './exception/404',
    },
];
import AlbumsPage from "../pages/Albums/Albums"
import AlbumsDetailsPage from "../pages/AlbumsDetailsPage/AlbumsDetailsPage"
import UserDetailsPage from "../pages/UserDetailsPage/UserDetailsPage"
import UsersPage from "../pages/Users/Users"

const publicRoutes = [
    {path: '/albums', component: AlbumsPage,},
    {path: '/users', component: UsersPage,},
    {path: '/users/:userId', component: UserDetailsPage,},
    {path: '/albums/:albumId', component: AlbumsDetailsPage,},
]

export {publicRoutes}
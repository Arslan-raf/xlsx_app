import { MAIN_ROUT,USER_ROUT, GUEST_ROUTE, INSTRUCTOR_ROUTE, TRANSPORT_ROUTE, REGISTRATION_ROUTE, EVENT_ROUTE,LOGIN_ROUTE } from "./utils/consts"
import User from './pages/UserPage'
import Guest from "./pages/GuestPage"
import Instructor from './pages/InstructorPage'
import Events from "./pages/EventsPage"
import Transport from "./pages/TransportPage"
import Auth from "../src/components/auth/Auth"

export const authRoutes = [
    {
        path: USER_ROUT,
        element: <User></User>
    },
    {
        path: GUEST_ROUTE,
        element: <Guest></Guest>
    },
    {
        path: INSTRUCTOR_ROUTE,
        element: <Instructor></Instructor>
    },
    {
        path: TRANSPORT_ROUTE,
        element: <Transport></Transport>
    },
    {
        path: EVENT_ROUTE,
        element: <Events></Events>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth></Auth>
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth></Auth>
    },
]

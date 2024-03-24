import {Link} from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='w-[20%]'>
        <div className="sidebar text-white bg-red-300">
           
            <ul className="list-unstyled components">
            <li>
                <Link to="/user-profile/profile">Profile</Link>
            </li>
            <li>
                <Link to="/user-profile/manage-items">Manage Items</Link>
            </li>
            <li>
                <Link to="/create-auction">Create Auction</Link>
            </li>
            <li>
                <Link to="/user-profile/bids-items">Bids Items</Link>
            </li>
            <li>
                <Link to="/user-profile/notifications">Notifications</Link>
            </li>
            <li>
                <Link to="/user-profile/account-settings">Account Settings</Link>
            </li>
            <li>
                <Link to="/user-profile/change-password">Change Password</Link>
            </li>
            <li>
                <Link to="/user-profile/logout">Logout</Link>
            </li>
            </ul>
        </div>
    
    </div>
  )
}

export default Sidebar
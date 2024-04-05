import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNotificationForUser, markNotificationAsRead } from "../store/notification/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getNotificationForUser());
  }, []);

  console.log(notifications, " notifications........");

  return (
    <div className="bg-green-700 text-white">
      <h1 className="text-center text-3xl font-bold">Notifications</h1>

      <div className="flex flex-col gap-4 px-5 py-10">
        {notifications.map((notification) => (
          <Link
            to={notification.link}
            key={notification._id}
            onClick={() => dispatch(markNotificationAsRead(notification._id))}
            className={` text-black p-4 rounded-md hover:bg-blue-400 ${
              notification.isRead ===false ? "bg-green-500" : "bg-white"
            }`}
          >
            <h1>{notification?.auction?.name}</h1>
            <img
              src={notification?.auction?.image}
              alt={notification?.auction?.name}
              className="w-20 h-20 object-cover"
            />
            <p>{notification?.message}</p>
            <span>{new Date(notification.createdAt).toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { getNotificationForUser, markAllNotificationsAsRead, markNotificationAsRead } from "../store/notification/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const [notificationData, setNotificationData] = useState()


  useEffect(() => {
    dispatch(getNotificationForUser());
  }, [dispatch]); // This useEffect only runs when the component mounts

  useEffect(() => {
    setNotificationData(notifications)
    console.log(notifications, " notifications........ useeffect.........");
  }, [notifications]); // This useEffect runs whenever notifications changes
  
  const handleMarkAllAsRead = async() => {
    console.log(("button click , , ..........."));
    await dispatch(markAllNotificationsAsRead());
    dispatch(getNotificationForUser());
  };

  const handleMarkSingleAsRead = async(id) => {
    console.log(("button click , , ..........."));
    await dispatch(markNotificationAsRead(id))
    dispatch(getNotificationForUser());
  };


  console.log(notificationData, " notificationsData........");

  return (
    <div className="bg-green-700 text-white">
      <h1 className="text-center text-3xl font-bold">Notifications</h1>
<button className="
      bg-blue-500 text-white px-4 py-2 rounded-md my-4"
      onClick={()=>handleMarkAllAsRead()} 

>Mark all as read</button>
      <div className="flex flex-col gap-4 px-5 py-10">

        {notificationData?.map((notification) => (
          <Link
            to={notification?.link}
            key={notification?._id}
            onClick={() =>handleMarkSingleAsRead(notification?._id) }
            className={` text-black p-4 rounded-md hover:bg-blue-400 ${
              notification?.isRead ===false ? "bg-green-500" : "bg-white"
            }`}
          >
            <h1>{notification?.auction?.name}</h1>
            <img
              src={notification?.auction?.image}
              alt={notification?.auction?.name}
              className="w-20 h-20 object-cover"
            />
            <p>{notification?.message}</p>
            <span>{new Date(notification?.createdAt).toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

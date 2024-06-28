import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/all-notification-route",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        // Update user notifications in Redux state if necessary
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error marking all read:", error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-notification-route",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        // Update user seen notifications in Redux state if necessary
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error deleting all read:", error);
      message.error("Something went wrong in notifications");
    }
  };

  const handleNotificationClick = (onClickPath) => {
    navigate(onClickPath);
    // Implement any additional logic needed when clicking on a notification
  };

  return (
    <Layout>
      <h1 className="p-3 text-center">Notification Page</h1>
      <Tabs>
        <Tabs.TabPane tab="Unread" key="unread">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <h4
              className="p-2"
              onClick={handleMarkAllRead}
              style={{
                cursor: "pointer",
                color: "#1890ff",
                marginBottom: "10px",
              }}
            >
              Mark All Read
            </h4>
          </div>
          {user &&
            user.notification &&
            user.notification.map((notification) => (
              <div
                key={notification.id}
                className="notification-card"
                style={{
                  cursor: "pointer",
                  background: "#1e90ff",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
                onClick={() =>
                  handleNotificationClick(notification.onClickPath)
                }
              >
                <div
                  className="notification-message"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {notification.message}
                </div>
              </div>
            ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="read">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <h4
              className="p-2"
              onClick={handleDeleteAllRead}
              style={{
                cursor: "pointer",
                color: "#ff4d4f",
                marginBottom: "10px",
              }}
            >
              Delete All Read
            </h4>
          </div>
          {user &&
            user.seennotification &&
            user.seennotification.map((notification) => (
              <div
                key={notification.id}
                className="notification-card"
                style={{
                  cursor: "pointer",
                  background: "blue",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
                onClick={() =>
                  handleNotificationClick(notification.onClickPath)
                }
              >
                <div
                  className="notification-message"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {notification.message}
                </div>
              </div>
            ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;

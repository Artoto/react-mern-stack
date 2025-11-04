import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem("access_token") ?? "";
  if (!isAuthenticated) {
    // Navigate คือ Component ของ React Router v6 ที่ใช้เปลี่ยนเส้นทาง
    // replace: true ป้องกันไม่ให้ผู้ใช้กดปุ่ม Back กลับมาหน้า Protected ได้
    return <Navigate to="/" replace />;
  }

  // Outlet จะทำหน้าที่แสดงผล Component ลูกที่อยู่ข้างใน <ProtectedRoute>
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

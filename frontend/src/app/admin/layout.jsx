import React from 'react';

// guard
import AdminGuard from 'src/guards/admin';

// layout
import DashboardLayout from 'src/layout/_admin';

export default function layout({ children }) {
  return (
    <AdminGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AdminGuard>
  );
}

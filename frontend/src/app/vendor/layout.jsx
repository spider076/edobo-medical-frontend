import React from 'react';

// guard
import VendorGuard from 'src/guards/vendor';

// layout
import VendorLayout from 'src/layout/_vendor';

export default function layout({ children }) {
  return (
    <VendorGuard>
      <VendorLayout>{children}</VendorLayout>
    </VendorGuard>
  );
}

import React from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Home,
} from "lucide-react";

function Order() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-sm shadow-sm max-w-xl w-full">

        {/* =======================
            Order Confirmed Header
        ======================= */}
        <div className="text-center">
          <CheckCircle size={48} className="mx-auto text-green-600" />
          <h2 className="text-2xl font-semibold mt-4">
            Order Confirmed 🎉
          </h2>
          <p className="text-gray-600 mt-2">
            Your order has been placed successfully and is on the way!
          </p>
        </div>

        {/* =======================
            Order Status Timeline
        ======================= */}
        <div className="mt-8 space-y-6">

          {/* Ordered */}
          <StatusItem
            icon={<CheckCircle className="text-green-600" />}
            title="Order Placed"
            desc="We’ve received your order"
            active
          />

          {/* Packed */}
          <StatusItem
            icon={<Package className="text-green-600" />}
            title="Packed"
            desc="Your items are being packed"
            active
          />

          {/* Shipped */}
          <StatusItem
            icon={<Truck className="text-yellow-400" />}
            title="Shipped"
            desc="Out for delivery"
          />

          {/* Delivered */}
          <StatusItem
            icon={<Home className="text-yellow-400" />}
            title="Delivered"
            desc="Expected in 2-3 days"
          />
        </div>
      </div>
    </div>
  );
}

/* =======================
   Reusable Status Item
======================= */
function StatusItem({ icon, title, desc, active }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`p-2 rounded-full ${
          active ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

export default Order;

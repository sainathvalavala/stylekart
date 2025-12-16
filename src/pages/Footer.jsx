import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useGetHomePageQuery } from "../services/HomePageApi/HomePageApi";

function Footer() {
  let { data } = useGetHomePageQuery();
  const icons = data?.icons;
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* =======================
            Top Sections
        ======================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm text-gray-600">
          {/* Online Shopping */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              ONLINE SHOPPING
            </h3>
            <ul className="space-y-2">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Home & Living</li>
              <li>Beauty</li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              CUSTOMER POLICIES
            </h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>T&C</li>
              <li>Terms Of Use</li>
              <li>Track Orders</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Careers</li>
              <li>Site Map</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          {/* =======================
              App Experience + Social
          ======================= */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              EXPERIENCE SHOPPING APP
            </h3>

            {/* App Buttons */}
            <div className="flex flex-col gap-3 mb-6 items-start">
              <img
                src={icons?.playStore}
                alt="Download on Google Play"
                className="h-10 w-auto"
              />

              <img
                src={icons?.appStore}
                alt="Download on App Store"
                className="h-10 w-auto"
              />
            </div>

            {/* Social Icons */}
            <h4 className="font-semibold text-gray-900 mb-3">KEEP IN TOUCH</h4>
            <div className="flex gap-4 text-gray-600">
              <Facebook className="cursor-pointer hover:text-pink-600" />
              <Instagram className="cursor-pointer hover:text-pink-600" />
              <Twitter className="cursor-pointer hover:text-pink-600" />
              <Youtube className="cursor-pointer hover:text-pink-600" />
            </div>
          </div>

          {/* Guarantees */}
          <div>
            <ul className="space-y-4">
              <li>
                <span className="font-semibold text-gray-900">
                  100% ORIGINAL
                </span>{" "}
                guarantee for all products
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Return within 14 days
                </span>{" "}
                of receiving your order
              </li>
            </ul>
          </div>
        </div>

        {/* =======================
            Divider
        ======================= */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* =======================
            Bottom Section
        ======================= */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Shopify. All rights reserved.</p>
          <p>Made with ❤️ by Sainath Valavala</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useEffect, useState } from "react";
import { GetBanners } from "../API/productapi";

const bannerText = {
  1: { title: "Big Fashion Sale", subtitle: "Up to 60% OFF on latest trends" },
  2: { title: "Electronics Deals", subtitle: "Smart gadgets at best prices" },
  3: { title: "Home & Living", subtitle: "Make your home more beautiful" },
  4: { title: "New Arrivals", subtitle: "Fresh collections just for you" },
};

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await GetBanners();
      const active = (data || [])
        .filter((b) => !b.isDeleted)
        .sort((a, b) => Number(a.banner_page) - Number(b.banner_page));
      setBanners(active);
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      3500
    );
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners.length) {
    return (
      <div className="w-full h-[220px] md:h-[420px] bg-gray-200 animate-pulse" />
    );
  }

  const banner = banners[current];
  const content =
    bannerText[banner.banner_page] || {
      title: "Special Offer",
      subtitle: "Don't miss out",
    };

  return (
    <div className="relative w-full rounded-xl h-[220px] md:h-[420px] overflow-hidden mb-6">
      
      <img
        src={banner.images?.[0]}
        alt={banner.banner_name}
        className="absolute   w-full h-full object-cover"
      />

      <div className="absolute  bg-black/40" />

      

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer ${
              i === current ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
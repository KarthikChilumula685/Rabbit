import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "./FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null); // ✅ separate ref for button
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside both sidebar and button
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 300,
          images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket 1" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 300,
          images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket 2" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 300,
          images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Stylish Jacket 3" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 300,
          images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Stylish Jacket 4" }],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center mb-2"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300
        lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;

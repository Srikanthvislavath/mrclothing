import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard.jsx";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80&sat=-8";

const CATEGORY_TILES = [
  {
    label: "TRENDING NOW",
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
    path: "/",
  },
  {
    label: "MEN'S COLLECTION",
    src: "https://images.unsplash.com/photo-1492447273231-0f8fececec69?auto=format&fit=crop&w=1000&q=80&sat=-12",
    path: "/men",
  },
  {
    label: "WOMEN'S COLLECTION",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80&sat=-8",
    path: "/women",
  },
  {
    label: "SUMMER SALE",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    path: "/",
  },
];

function Home() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = PRODUCTS.filter((p) => {
    const byCat = filter === "all" || p.category === filter;
    const bySearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return byCat && bySearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 sm:h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl animate-fadeIn">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-red-500 rounded-full text-sm font-bold uppercase tracking-wider animate-pulse">
                ⚡ Limited Time Offer
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-white drop-shadow-2xl">
              Summer Collection 2025
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 font-medium">
              Discover the latest trends with up to <span className="text-yellow-400 font-bold text-3xl">50% OFF</span>
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate('/men')}
                className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl inline-flex items-center"
              >
                Shop Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/women')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
              >
                Explore Women's
              </button>
            </div>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-8 text-white text-sm font-semibold opacity-90">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free Shipping
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Easy Returns
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Best Prices
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors text-gray-700"
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  filter === "all"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("men")}
                className={`px-6 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  filter === "men"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setFilter("women")}
                className={`px-6 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  filter === "women"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Women
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg">Explore our curated collections</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORY_TILES.map((category, idx) => (
            <button
              key={idx}
              onClick={() => navigate(category.path)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={category.src}
                alt={category.label}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:from-red-900/90 group-hover:via-red-700/60 transition-all duration-500">
              </div>
              <div className="absolute inset-0 flex items-end justify-center p-6">
                <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-white font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider drop-shadow-lg">
                    {category.label}
                  </h3>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-semibold">Shop Now →</span>
                  </div>
                </div>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Handpicked items just for you</p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-16 mt-16">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get Special Offers</h2>
          <p className="text-red-100 mb-8">Subscribe to our newsletter for exclusive deals and early access to new collections</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

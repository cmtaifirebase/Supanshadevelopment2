import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Shop: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Handcrafted Pottery Set",
      description: "Beautiful handcrafted pottery made by local artisans, perfect for your home.",
      price: 2499,
      image: "/Gallery/1.jpg",
      category: "Handicrafts"
    },
    {
      id: 2,
      name: "Organic Cotton Tote Bag",
      description: "Eco-friendly cotton tote bag with traditional designs, made by women's self-help groups.",
      price: 599,
      image: "/Gallery/2.jpg",
      category: "Fashion"
    },
    {
      id: 3,
      name: "Natural Honey",
      description: "Pure, organic honey collected from local beekeepers supporting sustainable practices.",
      price: 899,
      image: "/Gallery/3.jpg",
      category: "Food"
    },
    {
      id: 4,
      name: "Handwoven Scarf",
      description: "Exquisite handwoven scarf using traditional techniques, supporting local weavers.",
      price: 1299,
      image: "/Gallery/4.jpg",
      category: "Fashion"
    },
    {
      id: 5,
      name: "Artisanal Soap Set",
      description: "Natural, handmade soaps using traditional ingredients and methods.",
      price: 799,
      image: "/Gallery/5.jpg",
      category: "Wellness"
    },
    {
      id: 6,
      name: "Bamboo Utensil Set",
      description: "Sustainable bamboo utensils, perfect for eco-conscious living.",
      price: 1499,
      image: "/Gallery/6.jpg",
      category: "Home"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Shop with Purpose - Supansha Development Foundation</title>
        <meta name="description" content="Shop our curated collection of products that support local artisans and sustainable practices. Every purchase makes a difference." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/Gallery/1.jpg')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Shop with Purpose</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Every purchase supports local artisans and sustainable practices. Shop consciously, make an impact.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-[#F14B05] mb-2 block">{product.category}</span>
                  <h3 className="text-xl font-montserrat font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    <button className="bg-[#F14B05] hover:bg-[#F14B05]/90 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Your Purchase Makes a Difference</h2>
            <p className="text-gray-600">
              Every product you buy directly supports our community initiatives and helps create sustainable livelihoods.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#F14B05] mb-2">100+</div>
              <div className="text-gray-700">Artisans Supported</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#F14B05] mb-2">15+</div>
              <div className="text-gray-700">Villages Impacted</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#F14B05] mb-2">₹2L+</div>
              <div className="text-gray-700">Income Generated</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#F14B05] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Join Our Movement</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Be part of our mission to create sustainable livelihoods and preserve traditional crafts.
            Your support makes a real difference in our communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/volunteer" 
              className="bg-white hover:bg-gray-100 text-[#F14B05] px-8 py-3 rounded-md font-medium transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link 
              href="/donate" 
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop; 
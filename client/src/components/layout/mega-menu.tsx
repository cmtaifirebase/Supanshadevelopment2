import React, { FC } from 'react';
import { Link } from 'wouter';

interface MegaMenuProps {
  menuId: string;
  isActive: boolean;
}

const MegaMenu: FC<MegaMenuProps> = ({ menuId, isActive }) => {
  if (menuId === 'purpose') {
    return (
      <div id="mega-menu-purpose" className={`mega-menu fixed top-[60px] left-0 w-full bg-black shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        {/* <div className="container mx-auto py-6">
          <div className="mb-4 text-secondary">
            <h2 className="text-lg font-semibold">Spark of Purpose</h2>
            <p className="text-gray-300 text-sm">See the story behind the mission — who we serve, what we solve, and why we exist.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Structure & Spirit
              </h3>
              <p className="text-gray-400 text-sm">Explore our roots — mission, vision, and values that shape our path and purpose daily.</p>
              <Link href="/about" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Strategic Spheres
              </h3>
              <p className="text-gray-400 text-sm">Focus areas that lead our efforts: health, education, ecocare, and data-led research.</p>
              <Link href="/about#strategic-spheres" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Served Communities
              </h3>
              <p className="text-gray-400 text-sm">We center rural women, children, farmers, and frontline workers in fragile settings.</p>
              <Link href="/about#served-communities" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Supansha Squad
              </h3>
              <p className="text-gray-400 text-sm">Meet the team behind the transformation — from core leadership to grassroots warriors.</p>
              <Link href="/about#team" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
          </div>
        </div> */}
      </div>
    );
  }

  if (menuId === 'impact') {
    return (
      <div id="mega-menu-impact" className={`mega-menu fixed top-[60px] left-0 w-full bg-black shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-[#F14B05]">
            <h2 className="text-lg font-semibold">Stories of Impact</h2>
            <p className="text-gray-300 text-sm">Real Lives. Real Work. Real Change. Explore how change unfolds across people and places.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/gallery?category=events" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Shared Moments
                </h3>
                <p className="text-gray-400 text-sm">Events that united communities — from awareness to workshops and cultural exchanges.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/blog?category=success-stories" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Success Stories
                </h3>
                <p className="text-gray-400 text-sm">Discover journeys of grit and growth — each life touched tells a story of resilience.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/gallery" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Scenes of Change
                </h3>
                <p className="text-gray-400 text-sm">A visual journal of impact — snapshots of action, energy, and transformation on ground.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/blog" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Social Thoughts
                </h3>
                <p className="text-gray-400 text-sm">Reflections and voices from the field — blogs by experts, doers, and rural change-makers.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (menuId === 'change') {
    return (
      <div id="mega-menu-change" className={`mega-menu fixed top-[60px] left-0 w-full bg-black shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-[#F14B05]">
            <h2 className="text-lg font-semibold">Stand for Change</h2>
            <p className="text-gray-300 text-sm">Support. Strengthen. Shop. Serve. Together, let's create lasting transformation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/donate" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Support Causes
                </h3>
                <p className="text-gray-400 text-sm">Donate to uplift communities and fuel social change that creates long-term outcomes.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/causes" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Strengthen Sustainability
                </h3>
                <p className="text-gray-400 text-sm">Fund key projects that empower change makers and foster growth in rural populations.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/shop" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Shop with Purpose
                </h3>
                <p className="text-gray-400 text-sm">Buy unique products made by local hands — every purchase empowers lives and livelihoods.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/volunteer" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Serve Socially
                </h3>
                <p className="text-gray-400 text-sm">Join our network to co-create change and expand opportunities across rural regions.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (menuId === 'future') {
    return (
      <div id="mega-menu-future" className={`mega-menu fixed top-[60px] left-0 w-full bg-black shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-[#F14B05]">
            <h2 className="text-lg font-semibold">Shape the Future</h2>
            <p className="text-gray-300 text-sm">Opportunities that empower — step into roles that shape communities and careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/careers" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Seek Roles
                </h3>
                <p className="text-gray-400 text-sm">Explore jobs that help you use your talent for inclusive, lasting community development.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/partnerships" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Strengthen Partnerships
                </h3>
                <p className="text-gray-400 text-sm">Access tenders to build strategic alliances and grow transformative change at every level.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/internships" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Support Growth
                </h3>
                <p className="text-gray-400 text-sm">Take up internships to enhance your skills and grow into a leader with lasting impact.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
            <Link href="/forums" className="block hover:bg-gray-800 rounded-lg p-2 transition-colors">
              <div className="space-y-1">
                <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F14B05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Spark Dialogues
                </h3>
                <p className="text-gray-400 text-sm">Join forums where voices unite to create bold solutions for people, planet, and progress.</p>
                <span className="text-[#F14B05] text-sm inline-block mt-2 hover:underline">Learn More →</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MegaMenu;

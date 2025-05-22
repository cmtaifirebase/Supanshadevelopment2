"use client"

import type React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Update the GalleryImage type to include new fields
type GalleryImage = {
  id: number
  image: string
  caption: string
  category: string
  eventName?: string
  projectName?: string
  domainName?: string
}

// Create a client component that uses the useQuery hook
const GalleryContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const { data: apiGalleryItems, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/gallery")
        if (!response.ok) {
          return []
        }
        return response.json()
      } catch (error) {
        console.error("Error fetching gallery items:", error)
        return []
      }
    },
  })

  // Local gallery items
  const localGalleryItems: GalleryImage[] = [
    {
      id: 101,
      image: "/Gallery/1.jpg",
      caption: "Community Development",
      category: "Community",
      eventName: "Community Outreach",
      projectName: "Village Development",
      domainName: "Rural Development",
    },
    {
      id: 102,
      image: "/Gallery/2.jpg",
      caption: "Education Initiative",
      category: "Education",
      eventName: "School Program",
      projectName: "Education for All",
      domainName: "Child Education",
    },
    {
      id: 103,
      image: "/Gallery/3.jpg",
      caption: "Health Camp",
      category: "Health",
      eventName: "Medical Camp",
      projectName: "Rural Health",
      domainName: "Healthcare",
    },
    {
      id: 104,
      image: "/Gallery/4.jpg",
      caption: "Women Empowerment",
      category: "Empowerment",
      eventName: "Women's Workshop",
      projectName: "Skill Development",
      domainName: "Gender Equality",
    },
    {
      id: 105,
      image: "/Gallery/5.jpg",
      caption: "Environmental Care",
      category: "Ecocare",
      eventName: "Tree Plantation",
      projectName: "Green Earth",
      domainName: "Environment",
    },
    {
      id: 106,
      image: "/Gallery/6.jpg",
      caption: "Water Conservation",
      category: "Water",
      eventName: "Water Project",
      projectName: "Clean Water Initiative",
      domainName: "Water Resources",
    },
  ]

  // Combine both sets of images
  const allGalleryItems = [...(apiGalleryItems || []), ...localGalleryItems]

  const categories = [
    { id: "all", name: "All" },
    { id: "Health", name: "Health" },
    { id: "Education", name: "Education" },
    { id: "Community", name: "Community" },
    { id: "Empowerment", name: "Empowerment" },
    { id: "Ecocare", name: "Ecocare" },
    { id: "Water", name: "Water" },
  ]

  const filteredGallery =
    activeCategory === "all" ? allGalleryItems : allGalleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <Helmet>
        <title>Gallery - Supansha Development Foundation</title>
        <meta
          name="description"
          content="View images from our events, projects, and initiatives. A visual journey of our impact across communities."
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/Gallery/1.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Scenes of Change</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            A visual journal of impact — snapshots of action, energy, and transformation on ground.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex justify-center mb-8">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeCategory === category.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredGallery && filteredGallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredGallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-lg group h-64 cursor-pointer"
                      onClick={() => openLightbox(item)}
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                        <span className="text-white font-medium text-lg mb-1">{item.eventName || item.caption}</span>
                        <span className="text-white text-sm mb-1">{item.projectName || "Project"}</span>
                        <span className="text-white text-xs">{item.domainName || item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h2 className="text-2xl font-montserrat font-bold mb-2">No Images Found</h2>
                  <p className="text-gray-600">No images found in this category. Please try another category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-full max-h-screen p-0 m-0 bg-black border-none">
          <DialogHeader className="absolute top-4 left-4 right-4 z-10">
            <DialogTitle className="text-white">{selectedImage?.caption}</DialogTitle>
            <button onClick={closeLightbox} className="absolute top-2 right-2 p-2 text-white hover:text-white/80 z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-orange-500"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </DialogHeader>
          {selectedImage && (
            <div className="flex items-center justify-center h-screen w-screen">
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.caption}
                className="w-screen h-screen object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Our Impact */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-10 text-center">Our Impact in Numbers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-700">Villages</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">12,500+</div>
              <div className="text-gray-700">Lives Touched</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <div className="text-gray-700">Events</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-gray-700">States</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Be Part of the Change</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our work is made possible by volunteers and donors who believe in our mission. Join us in creating
            sustainable impact and transforming lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/donate"
              className="bg-primary hover:bg-[#F14B05]/90 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Donate Now
            </a>
            <a
              href="/volunteer"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// Create a new QueryClient instance
const queryClient = new QueryClient()

// Main Gallery component that provides the QueryClient
const Gallery: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GalleryContent />
    </QueryClientProvider>
  )
}

export default Gallery

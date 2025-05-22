"use client"

import type React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { Tab } from "@headlessui/react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const About: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const categories = ["Structure & Spirit", "Strategic Spheres", "Served Communities", "Supansha Squad"]

  const heroContent = [
    {
      title: "Structure & Spirit",
      description: "Explore our roots — mission, vision, and values that shape our path and purpose daily.",
      image:
        "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Strategic Spheres",
      description: "Focus areas that lead our efforts: health, education, ecocare, and data-led research.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Served Communities",
      description: "We center rural women, children, farmers, and frontline workers in fragile settings.",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Supansha Squad",
      description: "Meet the team behind the transformation — from core leadership to grassroots warriors.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ]

  return (
    <>
      <Helmet>
        <title>About Us - Supansha Development Foundation</title>
        <meta
          name="description"
          content="Learn about Supansha's mission, vision, values, and the team behind our transformation efforts."
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url('${heroContent[selectedTab].image}')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">{heroContent[selectedTab].title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl">{heroContent[selectedTab].description}</p>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tab.Group onChange={(index) => setSelectedTab(index)}>
            <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl mb-8">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary ring-primary ring-opacity-60",
                      selected ? "bg-primary text-white shadow" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {/* Structure & Spirit */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-montserrat font-bold mb-4">Supansha Development Foundation</h2>
                    <p className="text-2xl text-primary font-semibold mb-4">Delivering Sustainable Choices</p>
                    <p className="text-xl text-gray-700">
                      Empowering Communities | Fostering Growth | Driving Sustainable Impact
                    </p>
                  </div>

                  <div className="mb-12">
                    <h2 className="text-3xl font-montserrat font-bold mb-6">Welcome to SUPANSHA®</h2>
                    <p className="text-lg text-gray-700 mb-6">
                      <strong>
                        Social Union for Progressive Advancement and Navigation towards Sustainable Holistic Actions
                      </strong>
                    </p>
                    <p className="text-gray-700 mb-6">
                      At Supansha Development Foundation, we stand for more than just service delivery—we stand for
                      transformation. Every initiative we design and implement is guided by our mission of Delivering
                      Sustainable Choices, empowering individuals and communities to shape their own future with
                      dignity, opportunity, and self-reliance.
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Essence of SUPANSHA®</h3>
                    <p className="text-gray-700 mb-6">
                      Our name, SUPANSHA, is inspired by the Sanskrit words "सु" (Su) meaning good or noble, and "पंशा"
                      (Pansha) meaning support or encouragement. Together, they symbolize "Noble Support", the essence
                      of what we offer: upliftment, strength, and hope for a better tomorrow.
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Who We Are – The SUPANSHA® Network</h3>
                    <p className="text-gray-700 mb-6">
                      At SUPANSHA®, we are more than an organization—we are a movement of change makers, united by our
                      mission to build a better, inclusive future. We bring together governments, corporations, civil
                      society, and individuals into a single network that believes in shared progress.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Through this collective, we unite four types of development champions:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                      <li>
                        <strong>Development Doers</strong> – Individuals driving social change through grassroots action
                        and leadership.
                      </li>
                      <li>
                        <strong>Development Dealers</strong> – Businesses delivering practical, innovative, and scalable
                        solutions.
                      </li>
                      <li>
                        <strong>Development Drivers</strong> – NGOs and civil society organizations creating real impact
                        on the ground.
                      </li>
                      <li>
                        <strong>Development Donors</strong> – Supporters, CSR funders, and philanthropists empowering
                        sustainable futures.
                      </li>
                    </ul>
                    <p className="text-gray-700">
                      Together, this powerful ecosystem collaborates to tackle societal challenges with innovation,
                      compassion, and resilience.
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Our Core Commitment</h3>
                    <p className="text-gray-700 mb-4 font-semibold">Transforming Lives, Building Futures</p>
                    <p className="text-gray-700 mb-6">
                      At the heart of the SUPANSHA® network lies the integration of three transformative forces that
                      guide our strategy and inspire our people:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-light p-6 rounded-lg">
                        <h4 className="font-montserrat font-semibold text-xl mb-2">इक्षा शक्ति (Iksha-Shakti)</h4>
                        <p className="text-gray-700">
                          The Power of Intention: The unwavering will to bring change where it's needed most.
                        </p>
                      </div>
                      <div className="bg-light p-6 rounded-lg">
                        <h4 className="font-montserrat font-semibold text-xl mb-2">ज्ञान शक्ति (Gyan-Shakti)</h4>
                        <p className="text-gray-700">
                          The Power of Knowledge: Empowering minds through education, research, and informed
                          decision-making.
                        </p>
                      </div>
                      <div className="bg-light p-6 rounded-lg">
                        <h4 className="font-montserrat font-semibold text-xl mb-2">क्रिया शक्ति (Kriya-Shakti)</h4>
                        <p className="text-gray-700">
                          The Power of Action: Translating intent and insight into ground-level impact.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">
                      Our Philosophy: Change is Interconnected
                    </h3>
                    <p className="text-gray-700 mb-6">
                      True progress is never isolated. We work at the intersection of healthcare, education,
                      livelihoods, environmental care, research, and data-driven governance. Because every issue is
                      connected, our solutions must be holistic—crafted through collaboration, innovation, and
                      compassion.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-primary/5 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">Fostering Positive Change</h4>
                        <p className="text-gray-700">
                          Inspiring progress and uplifting communities through impactful, people-centered initiatives.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">Supporting Sustainable Development</h4>
                        <p className="text-gray-700">
                          Designing innovative solutions that create lasting, measurable improvements in lives and
                          livelihoods.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">Encouraging Growth</h4>
                        <p className="text-gray-700">
                          Empowering individuals, organizations, and ecosystems to realize their full potential.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Mission & Vision</h3>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-secondary/5 p-6 rounded-lg">
                        <h4 className="font-montserrat font-semibold text-xl mb-3 text-primary">Our Vision</h4>
                        <p className="text-gray-700">
                          To build empowered communities that are resilient, self-sufficient, and capable of
                          transforming their own futures through access, equity, and opportunity.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-6 rounded-lg">
                        <h4 className="font-montserrat font-semibold text-xl mb-3 text-primary">Our Mission</h4>
                        <p className="text-gray-700">
                          To create a world where every individual can live with dignity, reach their full potential,
                          and contribute to a sustainable, inclusive future.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Our CREATE Values</h3>
                    <p className="text-gray-700 mb-6">
                      We are guided by our CREATE values—six key principles that ensure all our programs are inclusive,
                      ethical, and future-ready:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      <div className="flex gap-3">
                        <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          C
                        </div>
                        <div>
                          <p className="font-semibold">Choices for All</p>
                          <p className="text-gray-700 text-sm">
                            Enabling fair, accessible options for every individual and community.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          A
                        </div>
                        <div>
                          <p className="font-semibold">Accountable Support</p>
                          <p className="text-gray-700 text-sm">
                            Delivering transparent, ethical, and reliable partnerships.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          R
                        </div>
                        <div>
                          <p className="font-semibold">Respect with Inclusion</p>
                          <p className="text-gray-700 text-sm">
                            Celebrating diversity and promoting equal dignity for all.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          T
                        </div>
                        <div>
                          <p className="font-semibold">Technical and Transparent Approach</p>
                          <p className="text-gray-700 text-sm">
                            Using smart tools to improve training and communication.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          E
                        </div>
                        <div>
                          <p className="font-semibold">Empathy in Action</p>
                          <p className="text-gray-700 text-sm">
                            Listening first, then acting—rooted in compassion and community feedback.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          E
                        </div>
                        <div>
                          <p className="font-semibold">Empowerment for Sustainability</p>
                          <p className="text-gray-700 text-sm">
                            Ensuring long-term change through self-reliant systems.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Legal Standing & Social Impact</h3>
                    <p className="text-gray-700 mb-6">
                      We are proud to be an ISO 9001:2015-certified Section 8 Company (License No. 144064), with 12A and
                      80G certifications, making your support eligible for up to 50% tax deductions under Indian Income
                      Tax laws.
                    </p>
                    <p className="text-gray-700 mb-8">
                      Our work is sustained through CSR partnerships, government collaborations, and crowdfunding,
                      allowing us to scale impact across India and beyond.
                    </p>
                  </div>

                  <div className="bg-gray-900 text-white p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Let's Build the Future Together</h3>
                    <p className="mb-6">
                      At Supansha, we believe in collective action and shared responsibility. Join us in this journey of
                      transformation—where every choice matters, every voice counts, and every life is valued.
                    </p>
                    <p className="font-semibold">Together, we are delivering sustainable choices.</p>
                  </div>
                </div>
              </Tab.Panel>

              {/* Strategic Spheres */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Our Strategic Spheres</h2>
                  <p className="text-gray-700 mb-8">
                    Our work spans four key areas where we focus our efforts and expertise to create lasting change.
                    These strategic spheres guide our projects and initiatives across communities.
                  </p>

                  {/* Health and Well-Being */}
                  <div className="mb-16">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                      <div
                        className="h-64 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-8">
                        <h3 className="text-2xl font-montserrat font-bold mb-4">1. Health and Well-Being</h3>
                        <div className="text-lg font-semibold text-primary mb-4">A Call for Compassionate Care</div>
                        <blockquote className="italic border-l-4 border-primary pl-4 mb-6 text-gray-700">
                          "The human body is the most precious creation in this universe—our responsibility is to
                          protect and preserve it."
                          <footer className="text-sm mt-2 font-normal">
                            — Sharda Dubey, Founder, Supansha Development Foundation
                          </footer>
                        </blockquote>

                        <p className="text-gray-700 mb-6">
                          In a world racing ahead with medical advancements, a silent crisis persists: people are
                          falling through the cracks—not because solutions are missing, but because they don't know whom
                          to ask or where to go. Amid policies and hospitals, what's often lost is the human
                          touch—empathy, emotional support, and community care.
                        </p>

                        <div className="bg-red-50 p-6 rounded-lg mb-6">
                          <h4 className="text-xl font-montserrat font-semibold mb-3">
                            The Problem: Health Access is More Than Just Infrastructure
                          </h4>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>
                              Lack of health literacy: People don't understand what services are available—or even which
                              doctor to see for which problem.
                            </li>
                            <li>
                              Fear and stigma around mental health: Anxiety, depression, and even suicidal thoughts go
                              unspoken in families.
                            </li>
                            <li>
                              Emotional isolation: Patients often suffer alone, with no one to talk to or guide them.
                            </li>
                            <li>
                              Disconnection from services: Especially in rural areas, people struggle to reach even the
                              most basic preventive screenings.
                            </li>
                            <li>
                              No clear "go-to" support: In times of emergency or chronic illness, families are lost in a
                              maze of systems and procedures.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Health Project Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Awareness & Rights Education</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Health literacy empowerment</li>
                          <li>Government scheme awareness</li>
                          <li>Healthcare navigation guidance</li>
                          <li>Process simplification</li>
                        </ul>
                        <a
                          href="/projects/health-awareness"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Community Health Camps</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Regular health screenings</li>
                          <li>Mental wellness workshops</li>
                          <li>Preventive care programs</li>
                          <li>Community support groups</li>
                        </ul>
                        <a
                          href="/projects/health-camps"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Mental Health & Emotional Resilience</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Safe spaces for expression</li>
                          <li>Mental health first aid</li>
                          <li>Support group facilitation</li>
                          <li>Suicide prevention</li>
                        </ul>
                        <a
                          href="/projects/mental-health"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">SUPANSHA® Community Network</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Volunteer network</li>
                          <li>Healthcare provider connections</li>
                          <li>Community support system</li>
                          <li>Holistic healing approach</li>
                        </ul>
                        <a
                          href="/projects/community-network"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">
                        Our Vision: A Healthier, Kinder India
                      </h4>
                      <p className="mb-4">We dream of a society where:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>No one is confused about their health care rights</li>
                        <li>Mental health is normalized, not stigmatized</li>
                        <li>Every illness is met with information, empathy, and immediate support</li>
                      </ul>
                    </div>
                  </div>

                  {/* Education and Livelihoods */}
                  <div className="mb-16">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                      <div
                        className="h-6 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1503676260728-1c19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-8">
                        <h3 className="text-2xl font-montserrat font-bold mb-4">2. Education and Livelihoods</h3>
                        <div className="text-lg font-semibold text-primary mb-4">
                          From Learning to Livelihood: Unlocking Potential with Purpose
                        </div>

                        <blockquote className="italic border-l-4 border-primary pl-4 mb-6 text-gray-700">
                          "Good education is not a guarantee of good livelihood, but good knowledge always leads to
                          meaningful work."
                          <footer className="text-sm mt-2 font-normal">
                            — Mrs. Sharda Dubey, Founder, Supansha Development Foundation
                          </footer>
                        </blockquote>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                          <h4 className="text-xl font-montserrat font-semibold mb-3">
                            Challenges in Education and Livelihoods
                          </h4>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>School Education: Heavy reliance on rote learning, lack of infrastructure</li>
                            <li>Dependency on Mobile & Coaching: Focus on performance over learning</li>
                            <li>Higher Education: Struggle for degrees without practical skills</li>
                            <li>Limited Access to Opportunities: Disconnect between schemes and beneficiaries</li>
                            <li>Workplace Realities: Lack of voice and confidence in young workers</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Education Project Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Educational Empowerment</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Resource accessibility</li>
                          <li>Mentorship & career guidance</li>
                          <li>Financial assistance</li>
                          <li>Skill development programs</li>
                        </ul>
                        <a
                          href="/projects/education-empowerment"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Real-World Knowledge & Skill Building</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Awareness programs</li>
                          <li>Skill workshops</li>
                          <li>Social sensitization</li>
                          <li>Practical training</li>
                        </ul>
                        <a
                          href="/projects/skill-building"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Livelihood Support & Entrepreneurship</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Employment pathways</li>
                          <li>Legal & emotional support</li>
                          <li>Entrepreneurial training</li>
                          <li>Business development</li>
                        </ul>
                        <a
                          href="/projects/livelihood-support"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Nurturing Future Leaders</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Leadership programs</li>
                          <li>Support systems</li>
                          <li>Community engagement</li>
                          <li>Professional development</li>
                        </ul>
                        <a
                          href="/projects/future-leaders"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">Our Vision</h4>
                      <p className="mb-4">
                        We envision a society where every individual—regardless of background—can unlock their full
                        potential through knowledge, skill, and purpose.
                      </p>
                      <p className="italic">
                        "When education meets opportunity, livelihoods follow—and lives transform."
                      </p>
                    </div>
                  </div>

                  {/* Biodiversity and Eco-care */}
                  <div className="mb-16">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                      <div
                        className="h-64 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-8">
                        <h3 className="text-2xl font-montserrat font-bold mb-4">3. Biodiversity and Eco-care</h3>
                        <div className="text-lg font-semibold text-primary mb-4">Reviving Harmony with Nature</div>

                        <blockquote className="italic border-l-4 border-primary pl-4 mb-6 text-gray-700">
                          "Prakriti se hi sab kuch hai — life, food, and existence itself."
                        </blockquote>

                        <div className="bg-green-50 p-6 rounded-lg mb-6">
                          <h4 className="text-xl font-montserrat font-semibold mb-3">
                            Challenges in Reviving Ecological Balance
                          </h4>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Loss of Traditional Knowledge</li>
                            <li>Monoculture and Chemical Dependency</li>
                            <li>Neglect of Native Species</li>
                            <li>Lack of Environmental Education</li>
                            <li>Water Scarcity and Mismanagement</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Eco-care Project Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Village Eco-Clubs</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Youth-led environmental clubs</li>
                          <li>Cleanliness drives</li>
                          <li>Tree planting initiatives</li>
                          <li>Water conservation</li>
                        </ul>
                        <a
                          href="/projects/eco-clubs"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Carbon Champions Program</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Emission reduction training</li>
                          <li>Organic farming support</li>
                          <li>Sustainable practices</li>
                          <li>Community leadership</li>
                        </ul>
                        <a
                          href="/projects/carbon-champions"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Native Tree Plantation</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Indigenous species focus</li>
                          <li>Geo-tagged plantations</li>
                          <li>Tree guardian program</li>
                          <li>Biodiversity corridors</li>
                        </ul>
                        <a
                          href="/projects/tree-plantation"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Community Seed Banks</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Indigenous species conservation</li>
                          <li>Community management</li>
                          <li>Plant nurseries</li>
                          <li>Traditional knowledge</li>
                        </ul>
                        <a
                          href="/projects/seed-banks"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">Our Vision</h4>
                      <p>
                        To create ecologically conscious rural communities that live in harmony with nature — where
                        every village becomes a guardian of biodiversity, every child grows up as an environmental
                        steward, and ancient eco-wisdom thrives alongside innovative green solutions.
                      </p>
                    </div>
                  </div>

                  {/* Research and Data Science */}
                  <div className="mb-16">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                      <div
                        className="h-64 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-8">
                        <h3 className="text-2xl font-montserrat font-bold mb-4">4. Research and Data Science</h3>
                        <div className="text-lg font-semibold text-primary mb-4">
                          From Ground Realities to Data-Driven Solutions
                        </div>

                        <blockquote className="italic border-l-4 border-primary pl-4 mb-6 text-gray-700">
                          "True progress stems from informed understanding, and research is its foundation."
                        </blockquote>

                        <div className="bg-purple-50 p-6 rounded-lg mb-6">
                          <h4 className="text-xl font-montserrat font-semibold mb-3">
                            Key Challenges in Research and Data Thinking
                          </h4>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Lack of Research Awareness</li>
                            <li>Gap in Practical Knowledge</li>
                            <li>Rise of Non-Authentic Degrees</li>
                            <li>Mismatch in Opportunities</li>
                            <li>Neglect of Cybersecurity</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Research Project Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Workshops and Training</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>R&D Thinking sessions</li>
                          <li>Problem-solving methods</li>
                          <li>Decision-making skills</li>
                          <li>Career development</li>
                        </ul>
                        <a
                          href="/projects/research-workshops"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Digital Tools Integration</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>DrData.in platform</li>
                          <li>Eshahar.in initiative</li>
                          <li>E-governance support</li>
                          <li>Digital literacy</li>
                        </ul>
                        <a
                          href="/projects/digital-tools"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Cyber Security</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Digital hygiene awareness</li>
                          <li>Fraud prevention</li>
                          <li>Data protection</li>
                          <li>Safe portal usage</li>
                        </ul>
                        <a
                          href="/projects/cyber-security"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg mb-3">Research Mentorship</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Personal guidance</li>
                          <li>Research design support</li>
                          <li>Mentor connections</li>
                          <li>Project implementation</li>
                        </ul>
                        <a
                          href="/projects/research-mentorship"
                          className="text-primary hover:text-primary-dark mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">
                        Vision: Building a Nation of Thinking, Secure Citizens
                      </h4>
                      <p className="mb-4">
                        We believe that even a child in a remote village should have the opportunity to innovate — and
                        that innovation should reach the world not just through social media, but through safe, secure,
                        and impactful community-based projects.
                      </p>
                      <p className="italic">
                        "Research is not just for scientists. And the internet is not just for browsing. Let's create a
                        generation that is informed, analytical, and cyber aware."
                      </p>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Served Communities */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Communities We Serve</h2>
                  <p className="text-gray-700 mb-8">
                    "Holistic Impact through Every Life Stage" - The SUPANSHA® Network is designed to cater to the
                    distinct needs of individuals across all stages of life. With a commitment to holistic development,
                    we focus on diverse groups through tailored programs that deliver sustainable outcomes and inclusive
                    progress.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Student Advancement */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://static.theprint.in/wp-content/uploads/2018/07/Playful_Schoolchildren_-_Science_City_-_Kolkata_2011-01-28_0295-e1574083056447.jpg')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">1. Student Advancement</h3>
                        <p className="text-gray-700 mb-4">
                          Fostering curiosity, innovation, and skill-building to empower students for a successful
                          future.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Supporting academic excellence</li>
                          <li>Extracurricular engagement</li>
                          <li>Career preparedness</li>
                        </ul>
                      </div>
                    </div>

                    {/* Adolescent Development */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">2. Adolescent Development</h3>
                        <p className="text-gray-700 mb-4">
                          Providing life skills education, mental health awareness, and holistic growth opportunities.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Life skills education</li>
                          <li>Mental health awareness</li>
                          <li>Resilience building</li>
                        </ul>
                      </div>
                    </div>

                    {/* Youth Enrichment */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">3. Youth Enrichment</h3>
                        <p className="text-gray-700 mb-4">
                          Enhancing employability, leadership, and entrepreneurial capabilities.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Leadership development</li>
                          <li>Entrepreneurial training</li>
                          <li>Social responsibility</li>
                        </ul>
                      </div>
                    </div>

                    {/* Women Empowerment */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">4. Women Empowerment</h3>
                        <p className="text-gray-700 mb-4">
                          Advancing gender equality through education, skills training, and economic opportunities.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Skills training</li>
                          <li>Economic opportunities</li>
                          <li>Social participation</li>
                        </ul>
                      </div>
                    </div>

                    {/* Men Strengthening */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">5. Men Strengthening</h3>
                        <p className="text-gray-700 mb-4">
                          Promoting emotional intelligence, mental well-being, and supportive family/community roles.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Emotional intelligence</li>
                          <li>Mental well-being</li>
                          <li>Family support</li>
                        </ul>
                      </div>
                    </div>

                    {/* Elder Support */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">6. Elder Support</h3>
                        <p className="text-gray-700 mb-4">
                          Ensuring dignity, healthcare, and meaningful engagement for the elderly.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Healthcare access</li>
                          <li>Social inclusion</li>
                          <li>Intergenerational bonding</li>
                        </ul>
                      </div>
                    </div>

                    {/* Inclusion of Persons with Diverse Abilities */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">
                          7. Inclusion of Persons with Diverse Abilities
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Advocating for accessibility, equal opportunity, and inclusive practices.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Accessibility initiatives</li>
                          <li>Equal opportunities</li>
                          <li>Talent celebration</li>
                        </ul>
                      </div>
                    </div>

                    {/* Ecosystem Stewardship */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">8. Ecosystem Stewardship</h3>
                        <p className="text-gray-700 mb-4">
                          Promoting environmental awareness, climate responsibility, and sustainable living.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Environmental awareness</li>
                          <li>Climate action</li>
                          <li>Biodiversity protection</li>
                        </ul>
                      </div>
                    </div>

                    {/* Community Enrichment */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">9. Community Enrichment</h3>
                        <p className="text-gray-700 mb-4">
                          Strengthening local communities through capacity-building and shared resources.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                          <li>Capacity building</li>
                          <li>Cultural heritage</li>
                          <li>Grassroots development</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary text-white p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Join Our Community</h3>
                    <p className="mb-6">
                      Together, we can create a more inclusive and empowered society. Whether you're looking to
                      contribute, participate, or learn more about our programs, we welcome you to be part of the
                      SUPANSHA® Network.
                    </p>
                    <a
                      href="/contact"
                      className="inline-block bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Get Involved
                    </a>
                  </div>
                </div>
              </Tab.Panel>

              {/* Supansha Squad */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Supansha Squad</h2>
                  <p className="text-gray-700 mb-8">
                    Meet the Leaders Who Carry the Light Forward. The Supansha Torch Bearers are the guiding force
                    behind every successful mission — from research to grassroots action. Their experience, dedication,
                    and values shape everything we do.
                  </p>

                  {/* Directors & Core Management */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">Directors & Core Management</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                    {/* Dr. Pankaj Dubey */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white flex flex-col h-full">
                      <div className="relative group w-full" style={{ minHeight: "16rem" }}>
                        <div
                          className="h-64 bg-cover bg-center w-full"
                          style={{
                            backgroundImage:
                              "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                          }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-white/90 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="font-montserrat font-semibold text-xl mb-1 text-center">Dr. Pankaj Dubey</h4>
                          <p className="text-primary mb-1 text-center">MSW, MPH, PhD</p>
                          <p className="text-gray-600 text-center">Director at Supansha Development Foundation</p>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-end">
                        <p className="text-gray-700 text-sm mt-4 mb-4 text-center">
                          Co-Founder & Strategic Head at Supansha. Brings 15+ years of public health leadership. Leads
                          innovation in TB elimination program, family planning services, cervical cancer awareness, and
                          digital health inclusion.
                        </p>
                      </div>
                    </div>

                    {/* Smt. Sharda Dubey */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white flex flex-col h-full">
                      <div className="relative group w-full" style={{ minHeight: "16rem" }}>
                        <div
                          className="h-64 bg-cover bg-center w-full"
                          style={{
                            backgroundImage:
                              "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                          }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-white/90 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="font-montserrat font-semibold text-xl mb-1 text-center">Smt. Sharda Dubey</h4>
                          <p className="text-primary mb-1 text-center">MSW</p>
                          <p className="text-gray-600 text-center">Director at Supansha Development Foundation</p>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-end">
                        <p className="text-gray-700 text-sm mt-4 mb-4 text-center">
                          Co-Founder and Head of Community Development at Supansha. Dedicated to improving health
                          outcomes for underserved populations through grassroots programs. Experienced in community
                          outreach and welfare initiatives.
                        </p>
                      </div>
                    </div>

                    {/* Dr. Rajesh Kumar */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white flex flex-col h-full">
                      <div className="relative group w-full" style={{ minHeight: "16rem" }}>
                        <div
                          className="h-64 bg-cover bg-center w-full"
                          style={{
                            backgroundImage:
                              "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                          }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-white/90 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="font-montserrat font-semibold text-xl mb-1 text-center">Dr. Rajesh Kumar</h4>
                          <p className="text-primary mb-1 text-center">MD, MPH</p>
                          <p className="text-gray-600 text-center">
                            Program Manager at Supansha Development Foundation
                          </p>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-end">
                        <p className="text-gray-700 text-sm mt-4 mb-4 text-center">
                          A seasoned healthcare professional with extensive experience in public health program
                          management. Leads our health initiatives and coordinates with various stakeholders to ensure
                          effective implementation of community health programs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Committees */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">Our Committees: Guiding Our Impact</h3>
                  <p className="text-gray-700 mb-8">
                    At Supansha Development Foundation, we operate with integrity and diligence, guided by a robust
                    system of committees that ensure the effectiveness and ethical conduct of all our programs. Each
                    committee is dedicated to a specific area of work and contributes to our mission of empowering
                    communities. Here's a look at the eight core committees driving our impact:
                  </p>

                  <div className="space-y-8 mb-12">
                    {/* HR Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        1. Human Resource & Workplace Grievance Redressal Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: To address HR-related issues, employee grievances, and ensure a safe and fair working
                        environment.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Promotes a positive and supportive work environment and ensures that employee grievances
                        are addressed in a timely and transparent manner.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior HR Manager (Responsible for overseeing the committee's operations and
                            ensuring fair resolution of workplace issues)
                          </li>
                          <li>
                            HR Manager: Employee Relations Specialist (Manages employee relations and grievance
                            redressal)
                          </li>
                          <li>Legal Advisor: Provides legal guidance on labor laws and policies</li>
                          <li>
                            Representative from Management: Senior executive to bridge the gap between leadership and
                            staff
                          </li>
                          <li>Employee Representative: A selected employee to advocate on behalf of the workforce</li>
                        </ul>
                      </div>
                    </div>

                    {/* Finance Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        2. Procurement, Finance & Compliance Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: To ensure effective procurement, financial management, and compliance with regulations
                        and policies.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Ensures that procurement processes are fair, transparent, and cost-efficient, while
                        overseeing financial operations to prevent mismanagement.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Finance Head (Oversees the committee's operations and ensures transparent
                            financial transactions)
                          </li>
                          <li>
                            Procurement Manager: Manages procurement processes and ensures compliance with procedures
                          </li>
                          <li>Finance Officer: Handles budgeting, financial reporting, and ensures transparency</li>
                          <li>
                            Compliance Officer: Ensures procurement activities adhere to legal and internal standards
                          </li>
                          <li>
                            Internal Auditor: Audits financial transactions and procurement processes for transparency
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* POSH & POCSO Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">3. POSH & POCSO Committee</h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: Ensuring a safe and respectful environment for everyone, with a focus on gender safety
                        and child protection.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Oversees the implementation of POSH (Prevention of Sexual Harassment) policies and
                        safeguards children from abuse or misconduct across all our programs.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior HR or Legal Expert (Oversees and ensures compliance with POSH and POCSO
                            regulations)
                          </li>
                          <li>
                            Vice Chairperson: Senior Manager or Senior HR (Assists Chairperson, especially in policy
                            enforcement)
                          </li>
                          <li>
                            Legal Advisor: Expert in legal matters, particularly regarding child protection and
                            harassment laws
                          </li>
                          <li>Child Welfare Expert: Specialized in child protection laws and practices</li>
                          <li>
                            Program Manager: Responsible for implementing POSH and POCSO policies in day-to-day
                            operations
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Health Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        4. Health, Nutrition & Welfare Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: Promoting public health and community welfare through nutrition programs, TB control,
                        and cancer screenings.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Responsible for the planning and execution of all health and welfare initiatives, ensuring
                        accessibility and inclusiveness in our health campaigns.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior Health Expert or Program Director (Leads the health and welfare
                            initiatives)
                          </li>
                          <li>
                            Vice Chairperson: Senior Nutritionist or Medical Officer (Supports health and nutrition
                            initiatives)
                          </li>
                          <li>
                            Public Health Expert: Specialized in public health initiatives and community welfare
                            programs
                          </li>
                          <li>
                            Welfare Coordinator: Focuses on welfare programs such as health camps and nutrition
                            education
                          </li>
                          <li>
                            Community Outreach Manager: Responsible for community engagement and ensuring inclusiveness
                            in health and nutrition programs
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Digital Safety Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        5. Digital Safety & Cyber Security Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: Ensuring safe digital practices and promoting cyber security awareness, particularly in
                        rural areas.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Educates communities on safe online practices to protect them from cyber threats and
                        misinformation.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior IT Expert or Cybersecurity Leader (Leads digital safety and
                            cybersecurity awareness initiatives)
                          </li>
                          <li>
                            Vice Chairperson: Senior Program Manager (Assists in overall strategy and implementation of
                            digital safety programs)
                          </li>
                          <li>
                            Cybersecurity Expert: Specialist in securing digital platforms and promoting safe online
                            practices
                          </li>
                          <li>
                            Community Engagement Officer: Ensures that digital safety awareness reaches target
                            communities, especially in rural areas
                          </li>
                          <li>
                            IT Compliance Officer: Ensures that the organization adheres to all digital regulations and
                            security standards
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Ethics Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        6. Institutional Ethics & Research Compliance Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: Guiding all research with high ethical standards and ensuring compliance with necessary
                        regulations.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Ensures that all our research activities meet the ethical and legal requirements,
                        including obtaining certifications like DISR for medical studies.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior Researcher or Academic Leader (Oversees the ethical standards for
                            research)
                          </li>
                          <li>
                            Vice Chairperson: Senior Legal or Compliance Officer (Ensures compliance with legal and
                            research ethics)
                          </li>
                          <li>
                            Research Ethics Expert: Experienced researcher familiar with ethics in medical and social
                            research
                          </li>
                          <li>
                            Compliance Officer: Ensures adherence to institutional and governmental guidelines (DISR,
                            ethical approvals, etc.)
                          </li>
                          <li>
                            Program Coordinator: Responsible for coordinating research programs and ensuring ethical
                            conduct in research projects
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Innovation Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        7. Innovation & Research Advisory Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: Fostering innovation and research skills among youth while supporting educational and
                        research initiatives.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Focuses on developing the next generation of problem-solvers, provides mentorship,
                        supports educational R&D programs, and advises on research methodologies.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior Academic or Research Director (Leads youth innovation and research
                            initiatives)
                          </li>
                          <li>
                            Vice Chairperson: Experienced Researcher or Educator (Supports the development of youth
                            research programs)
                          </li>
                          <li>
                            Youth Program Coordinator: Responsible for organizing and managing youth-focused innovation
                            and research programs
                          </li>
                          <li>
                            Innovation Specialist: Expert in fostering creative and innovative ideas within the youth
                            community
                          </li>
                          <li>Mentor/Advisor: Provides mentorship and guidance to young innovators and researchers</li>
                        </ul>
                      </div>
                    </div>

                    {/* Government Projects Committee */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-4">
                        8. Government Projects Compliance Committee
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Purpose: Ensuring our government-funded projects meet all legal, regulatory, and reporting
                        requirements.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Role: Ensures that all government-funded programs are compliant with policies, guidelines, and
                        documentation standards.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Members & Designations:</h5>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>
                            Chairperson: Senior Compliance Officer or Government Liaison (Oversees compliance for
                            government-funded projects)
                          </li>
                          <li>
                            Vice Chairperson: Senior Manager or Project Director (Supports compliance management and
                            reporting)
                          </li>
                          <li>
                            Regulatory Affairs Officer: Expert in government regulations and reporting requirements
                          </li>
                          <li>
                            Project Documentation Specialist: Ensures that all project documentation is complete and
                            meets compliance standards
                          </li>
                          <li>
                            Field Program Coordinator: Ensures that on-the-ground activities align with government
                            project guidelines and goals
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Volunteers Section */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">
                    Our Volunteers: Strength of Supansha Network
                  </h3>
                  <p className="text-gray-700 mb-8">
                    At Supansha, our volunteers are the heart and soul of our efforts. They are the hands that bring our
                    vision to life in every community we serve. With unwavering dedication and passion, they support us
                    in reaching new heights, whether it's raising awareness, organizing health camps, or providing
                    critical assistance in our field programs. Their tireless commitment drives the success of our
                    missions, and their work is invaluable in shaping the future we are building together.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Volunteer Card 1 */}
                    <div className="group relative h-[400px] perspective-1000">
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden">
                          <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                            <div
                              className="h-64 bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                              }}
                            ></div>
                            <div className="p-6">
                              <h4 className="font-montserrat font-semibold text-xl mb-1">Priya Sharma</h4>
                              <p className="text-primary mb-2">Health Awareness Campaign</p>
                              <p className="text-gray-600">Rural Communities</p>
                            </div>
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-6 shadow-lg">
                          <p className="text-gray-700">
                            Priya Sharma is a dedicated field volunteer instrumental in organizing awareness campaigns
                            and health check-up camps. Focused on community health, they work tirelessly to improve
                            health outcomes in underserved communities. With a strong passion for service, they bridge
                            the gap between healthcare providers and rural populations.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Volunteer Card 2 */}
                    <div className="group relative h-[400px] perspective-1000">
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden">
                          <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                            <div
                              className="h-64 bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                              }}
                            ></div>
                            <div className="p-6">
                              <h4 className="font-montserrat font-semibold text-xl mb-1">Rahul Verma</h4>
                              <p className="text-primary mb-2">Health Education & Advocacy</p>
                              <p className="text-gray-600">Urban Outreach</p>
                            </div>
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-6 shadow-lg">
                          <p className="text-gray-700">
                            Rahul Verma has been a key player in health education and advocacy, especially in maternal
                            and child health. They actively engage in grassroots-level initiatives, helping educate
                            local communities about preventive measures and ensuring accessibility to crucial health
                            services.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Volunteer Card 3 */}
                    <div className="group relative h-[400px] perspective-1000">
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden">
                          <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                            <div
                              className="h-64 bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                              }}
                            ></div>
                            <div className="p-6">
                              <h4 className="font-montserrat font-semibold text-xl mb-1">Amit Patel</h4>
                              <p className="text-primary mb-2">Digital Health Literacy</p>
                              <p className="text-gray-600">Technology Integration</p>
                            </div>
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-6 shadow-lg">
                          <p className="text-gray-700">
                            An enthusiastic volunteer with a focus on digital health literacy, Amit Patel has
                            contributed significantly to expanding digital health awareness and organizing essential
                            medical camps. Their work is making a lasting impact on health education in remote areas.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Volunteer Card 4 */}
                    <div className="group relative h-[400px] perspective-1000">
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden">
                          <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                            <div
                              className="h-64 bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                              }}
                            ></div>
                            <div className="p-6">
                              <h4 className="font-montserrat font-semibold text-xl mb-1">Neha Gupta</h4>
                              <p className="text-primary mb-2">Community Outreach</p>
                              <p className="text-gray-600">Youth Programs</p>
                            </div>
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-6 shadow-lg">
                          <p className="text-gray-700">
                            With a background in public health, Neha Gupta has been instrumental in advancing community
                            outreach programs. They focus on empowering the youth through health education and creating
                            awareness about the importance of preventive healthcare.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary text-white p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Join Our Team</h3>
                    <p className="mb-6">
                      Whether you're interested in joining our committees, becoming a volunteer, or contributing in
                      other ways, we welcome your participation in our mission to create positive change.
                    </p>
                    <a
                      href="/contact"
                      className="inline-block bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Get Involved
                    </a>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}

export default About

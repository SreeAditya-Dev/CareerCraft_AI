"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ExternalLink, Search } from 'lucide-react';

const RoadmapClient = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const roadmaps = [
    {
      title: "Android Developer Roadmap",
      description: "Start your journey to becoming an Android Developer with our Roadmap 2025!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/android.pdf"
    },
    {
      title: "Frontend Developer Roadmap",
      description: "Start your Frontend Developer journey with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/frontend.pdf"
    },
    {
      title: "Backend Developer Roadmap",
      description: "Kickstart your Backend Developer career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/backend.pdf"
    },
    {
      title: "Full Stack Developer Roadmap",
      description: "Kickstart your Full Stack Developer career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/full-stack.pdf"
    },
    {
      title: "QA Engineer Roadmap",
      description: "Kickstart your QA Engineer career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/qa.pdf"
    },
    {
      title: "Software Architect Roadmap",
      description: "Kickstart your Software Architect career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/software-architect.pdf"
    },
    {
      title: "DevOps Roadmap",
      description: "Kickstart your DevOps career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/devops.pdf"
    },
    {
      title: "Cyber Security Roadmap",
      description: "Kickstart your Cyber Security career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/cyber-security.pdf"
    },
    {
      title: "Technical Writer Roadmap",
      description: "Kickstart your Technical Writer career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/technical-writer.pdf"
    },
    {
      title: "UX Design Roadmap",
      description: "Kickstart your UX Design career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/ux-design.pdf"
    },
    {
      title: "AI and Data Scientist Roadmap",
      description: "Kickstart your AI and Data Scientist career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/ai-data-scientist.pdf"
    },
    {
      title: "Product Manager Roadmap",
      description: "Kickstart your Product Manager career with the 2025 roadmap!",
      pdfLink: "https://roadmap.sh/pdfs/roadmaps/product-manager.pdf"
    },
    {
      "title": "Social Media Strategist Roadmap",
      "description": "Start your journey as a Social Media Strategist with the 2025 roadmap!",
      "pdfLink": "https://drive.google.com/file/d/14n8XH6xdHDQgIZollSeAAqRdPHDshq3e/view"
    },
    {
      "title": "Financial Analyst Roadmap",
      "description": "Begin your career as a Financial Analyst with this 2025 roadmap!",
      "pdfLink": "https://drive.google.com/file/d/13e_3U47xhsEgnqB7v-pM5Q1qkHrlnZAp/view"
    },
    {
      "title": "Investment Banking Associate Roadmap",
      "description": "Step into the world of investment banking with this structured 2025 roadmap!",
      "pdfLink": "https://drive.google.com/file/d/13e_3U47xhsEgnqB7v-pM5Q1qkHrlnZAp/view"
    }
  ];

  // Filter roadmaps based on search query
  const filteredRoadmaps = roadmaps.filter(roadmap =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white p-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Explore Roadmaps</h1>
        <p className="text-gray-400 text-xl mb-8">Discover the pathway to your dream tech career</p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search roadmaps..."
              className="pl-10 bg-zinc-900/50 border-zinc-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap, index) => (
            <Card key={index} className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <CardContent className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-semibold text-white mb-2">{roadmap.title}</h2>
                <p className="text-gray-400 mb-6 flex-grow">{roadmap.description}</p>
                
                <a 
                  href={roadmap.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Roadmap</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapClient;
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink, Search, BookOpen, Video, FileText, Filter } from 'lucide-react';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const resources = [
    {
      title: "70+ Essential React Interview Questions",
      description: "Comprehensive guide for React interview preparation with detailed answers and examples.",
      type: "PDF",
      status: "available",
      downloads: 1234,
      pdfLink: "https://example.com/react-interview-questions.pdf"
    },
    {
      title: "Python DSA + LEETCODE Exercises",
      description: "Master Data Structures & Algorithms with Python through practical LeetCode problems.",
      type: "Video",
      status: "available",
      downloads: 856
    },
    {
      title: "Apna College DSA Sheet",
      description: "Curated collection of DSA problems to build your problem-solving skills.",
      type: "DSA Sheet",
      status: "available",
      downloads: 2341,
      pdfLink: "https://example.com/tcs-nqt-papers.pdf"
    },
    {
      title: "TCS NQT Previous Year Papers",
      description: "Complete collection of TCS NQT papers from 2023 with detailed solutions.",
      type: "PDF",
      status: "available",
      downloads: 943,
      
    },
    {
      title: "LTI Mindtree GET 2024 Paper",
      description: "Latest Graduate Engineer Trainee exam paper with comprehensive solutions.",
      type: "PDF",
      status: "available",
      downloads: 567
    },
    {
      title: "Striver's SDE Sheet",
      description: "Structured approach to crack coding interviews at top tech companies.",
      type: "DSA Sheet",
      status: "coming_soon",
      downloads: 0
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const stats = {
    totalResources: resources.length,
    totalDownloads: resources.reduce((acc, curr) => acc + curr.downloads, 0),
    types: ['PDF', 'Video', 'DSA Sheet']
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'PDF':
        return <FileText className="h-4 w-4" />;
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'DSA Sheet':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Explore Resources</h1>
        <p className="text-gray-400 text-xl">Discover resources to advance your career</p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-10 bg-zinc-900/50 border-zinc-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <Card key={index} className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <CardContent className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-semibold text-white mb-2">{resource.title}</h2>
                <p className="text-gray-400 mb-6 flex-grow">{resource.description}</p>
                {resource.status === "coming_soon" ? (
                  <Button disabled className="w-full bg-zinc-800 text-gray-400 hover:bg-zinc-800 cursor-not-allowed">
                    Coming Soon
                  </Button>
                ) : (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    {resource.type === "PDF" ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                    {resource.type === "PDF" ? "Download" : "View Resource"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
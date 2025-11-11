import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClubCard from "@/components/ClubCard";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Club = Database['public']['Tables']['clubs']['Row'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch categories from database
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('category')
        .order('category');

      if (error) throw error;
      
      // Get unique categories
      const uniqueCategories = Array.from(
        new Set(data.map((club) => club.category))
      ).filter(Boolean) as string[];
      
      return uniqueCategories;
    },
  });

  // Fetch clubs with filters
  const { data: clubs, isLoading } = useQuery({
    queryKey: ['clubs', searchQuery, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('clubs')
        .select('*')
        .order('name');

      // Apply search filter
      if (searchQuery) {
        const searchPattern = `%${searchQuery}%`;
        query = query.or(`name.ilike.${searchPattern},short_desc.ilike.${searchPattern}`);
      }

      // Apply category filter
      if (selectedCategory !== "all") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data as Club[]) || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="gradient-text">Club Connect</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover and join clubs at Pierce College
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="gap-2" asChild>
                <a href="#clubs">
                  Explore Clubs
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Calendar className="h-5 w-5" />
                My Schedule
              </Button>
            </div>

            <div className="flex justify-center">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery}
                placeholder="Search for clubs..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          {categories && (
            <FilterChips
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          )}
        </div>
      </section>

      {/* Clubs Grid */}
      <section id="clubs" className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {selectedCategory === "all" ? "All Clubs" : selectedCategory}
          </h2>
          <p className="text-muted-foreground">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {clubs?.length || 0} {(clubs?.length || 0) === 1 ? "club" : "clubs"} found
              </>
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : clubs && clubs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No clubs found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubs?.map((club) => (
              <ClubCard
                key={club.id}
                slug={club.slug}
                name={club.name}
                shortDesc={club.short_desc}
                room={club.room || ""}
                nextMeeting={club.next_meeting || undefined}
                category={club.category}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Stats Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{clubs?.length || 0}+</div>
              <div className="text-muted-foreground">Active Clubs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-muted-foreground">Student Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Events Monthly</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

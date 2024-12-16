import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { BookCard } from "@/components/books/BookCard";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    available: true,
    coverUrl: "https://source.unsplash.com/random/400x600?book",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    available: false,
    coverUrl: "https://source.unsplash.com/random/400x600?library",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    available: true,
    coverUrl: "https://source.unsplash.com/random/400x600?novel",
  },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleBorrow = (bookId: number) => {
    toast({
      title: "Borrow Request Sent",
      description: "Your request has been sent to the librarian for approval.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-library-800 mb-2">Library System</h1>
            <p className="text-gray-600 mb-8">Please login to continue</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar isAdmin={false} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-library-800">Library Catalog</h1>
              <Input
                type="search"
                placeholder="Search books..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  available={book.available}
                  coverUrl={book.coverUrl}
                  onBorrow={() => handleBorrow(book.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
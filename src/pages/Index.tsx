import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { BookCard } from "@/components/books/BookCard";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Book, Search, User } from "lucide-react";

// Mock data for demonstration
const mockBooks = [
  {
    id: 1,
    title: "Büyük Gatsby",
    author: "F. Scott Fitzgerald",
    available: true,
    coverUrl: "https://source.unsplash.com/random/400x600?book",
  },
  {
    id: 2,
    title: "Bülbülü Öldürmek",
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

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      toast({
        title: "Giriş Başarılı",
        description: "Kütüphane sistemine hoş geldiniz!",
      });
    }
  };

  const handleBorrow = (bookId: number) => {
    toast({
      title: "Ödünç Alma Talebi Gönderildi",
      description: "Talebiniz kütüphaneciye iletildi ve onay bekliyor.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-library-800 mb-2">Kütüphane Sistemi</h1>
            <p className="text-gray-600 mb-8">Devam etmek için lütfen giriş yapın</p>
          </div>
          <LoginForm onLoginSuccess={() => handleLogin(true)} />
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
              <h1 className="text-3xl font-bold text-library-800">Kitap Kataloğu</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Kitap ara..."
                    className="pl-10 max-w-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
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
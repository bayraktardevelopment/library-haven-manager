import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Book, Home, Library, LogOut, User, Users } from "lucide-react";

const adminItems = [
  { title: "Ana Sayfa", icon: Home, url: "/" },
  { title: "Kitaplar", icon: Book, url: "/books" },
  { title: "Öğrenciler", icon: Users, url: "/students" },
  { title: "Profil", icon: User, url: "/profile" },
];

const studentItems = [
  { title: "Ana Sayfa", icon: Home, url: "/" },
  { title: "Kitapları Görüntüle", icon: Book, url: "/books" },
  { title: "Ödünç Aldıklarım", icon: Library, url: "/my-borrows" },
  { title: "Profil", icon: User, url: "/profile" },
];

export function AppSidebar({ isAdmin = false }) {
  const items = isAdmin ? adminItems : studentItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Kütüphane Sistemi</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-red-500">
                  <LogOut className="h-4 w-4" />
                  <span>Çıkış Yap</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
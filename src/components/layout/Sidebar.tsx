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
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Books", icon: Book, url: "/books" },
  { title: "Students", icon: Users, url: "/students" },
  { title: "Profile", icon: User, url: "/profile" },
];

const studentItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Browse Books", icon: Book, url: "/books" },
  { title: "My Borrows", icon: Library, url: "/my-borrows" },
  { title: "Profile", icon: User, url: "/profile" },
];

export function AppSidebar({ isAdmin = false }) {
  const items = isAdmin ? adminItems : studentItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Library System</SidebarGroupLabel>
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
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
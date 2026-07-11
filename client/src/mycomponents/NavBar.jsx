// src/mycomponents/NavBar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, LogOut, BookOpen, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuthStore } from "../utils/auth.store";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get user initials
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(" ");
      if (names.length >= 2) {
        return names[0][0] + names[1][0];
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  // Get user name
  const getUserName = () => {
    if (user?.name) return user.name;
    return "User";
  };

  return (
    <>
      <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="font-semibold dark:text-white">LMS</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="hover:text-primary dark:text-gray-300 dark:hover:text-white"
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/user/courses"
                  className="hover:text-primary dark:text-gray-300 dark:hover:text-white"
                >
                  My Courses
                </Link>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle - Desktop */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="dark:border-gray-600 dark:hover:bg-gray-800"
                    >
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Auth Section */}
              {!isAuthenticated ? (
                <Button
                  onClick={() => navigate("/login")}
                  className="hidden md:inline-flex"
                >
                  Login
                </Button>
              ) : (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Custom Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 py-1 z-50">
                      <div className="px-4 py-2 text-sm font-medium border-b dark:border-gray-700 dark:text-white">
                        {getUserName()}
                      </div>
                      <Link
                        to="/user/courses"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <BookOpen className="h-4 w-4" />
                        My Courses
                      </Link>
                      <div className="border-t dark:border-gray-700"></div>
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                          navigate("/");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button - Only shows on mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sheet - WITH MORE PADDING */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="dark:bg-gray-900 p-6">
          <div className="flex flex-col gap-6 mt-8">
            {/* User Info */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium dark:text-white text-base">
                    {getUserName()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium dark:text-gray-200 hover:text-primary dark:hover:text-white py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                🏠 Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/user/courses"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium dark:text-gray-200 hover:text-primary dark:hover:text-white py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  📚 My Courses
                </Link>
              )}
            </div>

            <div className="border-t dark:border-gray-700"></div>

            {/* Theme toggle in mobile menu */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium dark:text-gray-300">
                Theme
              </span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  ☀️ Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  🌙 Dark
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  💻 System
                </Button>
              </div>
            </div>

            <div className="border-t dark:border-gray-700"></div>

            {/* Mobile Auth Buttons */}
            <div className="pt-2">
              {!isAuthenticated ? (
                <Button
                  className="w-full py-6 text-base"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/login");
                  }}
                >
                  🔑 Login
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full py-6 text-base"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                    navigate("/");
                  }}
                >
                  🚪 Logout
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

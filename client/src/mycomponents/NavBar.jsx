// src/mycomponents/NavBar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, LogOut, BookOpen, User, Moon, Sun } from "lucide-react";
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
  const { setTheme } = useTheme();
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

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
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

              {!isAuthenticated ? (
                <Button onClick={() => navigate("/login")}>Login</Button>
              ) : (
                <div className="relative" ref={dropdownRef}>
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
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu */}
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

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="dark:bg-gray-900">
          <div className="flex flex-col gap-4 mt-8">
            {isAuthenticated && (
              <div className="flex items-center gap-2 pb-2 border-b dark:border-gray-700">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium dark:text-white">
                  {getUserName()}
                </span>
              </div>
            )}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="dark:text-gray-300"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/user/courses"
                onClick={() => setMobileOpen(false)}
                className="dark:text-gray-300"
              >
                My Courses
              </Link>
            )}
            <div className="border-t dark:border-gray-700"></div>

            {/* Theme toggle in mobile menu */}
            <div className="flex items-center gap-2">
              <span className="text-sm dark:text-gray-300">Theme:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme("light")}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                Light
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme("dark")}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                Dark
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme("system")}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                System
              </Button>
            </div>

            <div className="border-t dark:border-gray-700"></div>
            {!isAuthenticated ? (
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

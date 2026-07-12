// src/mycomponents/CoursesPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/auth.store";
import axiosInstance from "../utils/axiosInstance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export default function CoursesPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if not logged in
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/user/courses");
        setCourses(response.data.result || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isAuthenticated, navigate]);

  const handleStartCourse = (courseId) => {
    navigate(`/user/courses/${courseId}`);
  };

  const getStatusBadge = (course) => {
    if (course.progress === 100) {
      return <Badge className="bg-green-500">Completed</Badge>;
    } else if (course.progress > 0) {
      return <Badge className="bg-blue-500">In Progress</Badge>;
    } else {
      return (
        <Badge
          variant="secondary"
          className="dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/20"
        >
          Not Started
        </Badge>
      );
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 50) return "bg-blue-500";
    if (progress > 0) return "bg-yellow-500";
    return "bg-gray-300 dark:bg-white/20";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] dark:bg-black">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 dark:border-white border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] dark:bg-black">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{error}</p>
          <Button
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-black dark:border dark:border-white/20 dark:hover:bg-white/10 dark:text-white"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
              No Courses Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              You haven't enrolled in any courses yet.
            </p>
            <Button
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-black dark:border dark:border-white/20 dark:hover:bg-white/10 dark:text-white"
              onClick={() => navigate("/")}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Courses
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user?.name || "Student"}! Continue your learning
              journey.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <GraduationCap className="h-5 w-5" />
              <span>
                {courses.length} {courses.length === 1 ? "Course" : "Courses"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="dark:bg-black dark:border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Courses
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courses.length}
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-transparent dark:border dark:border-white/20 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-emerald-600 dark:text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-black dark:border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {
                      courses.filter(
                        (c) => c.progress > 0 && c.progress < 100
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-yellow-500/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-black dark:border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courses.filter((c) => c.progress === 100).length}
                  </p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.courseId}
              className="hover:shadow-lg dark:hover:shadow-none transition-shadow duration-200 flex flex-col dark:bg-black dark:border-white/10"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-1 text-gray-900 dark:text-white">
                    {course.title}
                  </CardTitle>
                  {course.classroomAssigned && (
                    <Badge
                      variant="outline"
                      className="ml-2 shrink-0 dark:border-white/20 dark:text-gray-200"
                    >
                      Classroom
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2 mt-1 text-gray-500 dark:text-gray-400">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Progress
                  </span>
                  {getStatusBadge(course)}
                </div>
                <div className="space-y-1">
                  <Progress
                    value={course.progress}
                    className="h-2 dark:bg-white/10"
                    indicatorClassName={getProgressColor(course.progress)}
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
                    {course.progress}% complete
                  </p>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t dark:border-white/10">
                <Button
                  className="w-full group bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-black dark:border dark:border-white/20 dark:hover:bg-white/10 dark:text-white"
                  onClick={() => handleStartCourse(course.courseId)}
                >
                  {course.progress === 100 ? (
                    "Review Course"
                  ) : course.progress > 0 ? (
                    <>
                      Continue Learning
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Start Course
                      <PlayCircle className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
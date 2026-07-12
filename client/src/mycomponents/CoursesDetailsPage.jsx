// src/mycomponents/CoursesDetailsPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/auth.store";
import axiosInstance from "@/utils/axiosInstance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Video,
  FileText,
  Link as LinkIcon,
  Calendar,
  Clock,
  User,
  Mail,
  Award,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronLeft,
  PlayCircle,
  FileQuestion,
} from "lucide-react";

export default function CoursesDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        const response = await axiosInstance.get(`/user/courses/${courseId}`);
        setCourse(response.data.course);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load course details"
        );
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, isAuthenticated, navigate]);

  const handleMaterialToggle = async (moduleId, materialId, currentStatus) => {
    setUpdating(true);
    try {
      // Call API to update material status
      await axiosInstance.patch(`/user/materials/${materialId}`, {
        completed: !currentStatus,
      });

      // Update local state
      setCourse((prev) => {
        const updatedModules = prev.modules.map((module) => {
          if (module._id === moduleId) {
            return {
              ...module,
              studyMaterials: module.studyMaterials.map((material) => {
                if (material._id === materialId) {
                  return { ...material, completed: !currentStatus };
                }
                return material;
              }),
            };
          }
          return module;
        });

        // Recalculate progress
        const totalMaterials = updatedModules.reduce(
          (acc, module) => acc + module.studyMaterials.length,
          0
        );
        const completedMaterials = updatedModules.reduce(
          (acc, module) =>
            acc + module.studyMaterials.filter((m) => m.completed).length,
          0
        );
        const newProgress =
          totalMaterials > 0
            ? Math.round((completedMaterials / totalMaterials) * 100)
            : 0;

        return {
          ...prev,
          modules: updatedModules,
          progress: newProgress,
        };
      });
    } catch (err) {
      console.error("Error updating material:", err);
      setError("Failed to update material status");
    } finally {
      setUpdating(false);
    }
  };

  const getMaterialIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "link":
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">✅ Completed</Badge>;
      case "Submitted":
        return <Badge className="bg-blue-500">📤 Submitted</Badge>;
      case "Pending":
        return (
          <Badge
            variant="secondary"
            className="dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/20"
          >
            ⏳ Pending
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/20"
          >
            {status}
          </Badge>
        );
    }
  };

  const getAssignmentStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 dark:text-green-400";
      case "Submitted":
        return "text-blue-600 dark:text-blue-400";
      case "Pending":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] dark:bg-black">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 dark:border-white border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Loading course details...
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
            onClick={() => navigate("/user/courses")}
          >
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] dark:bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Course Not Found
          </h2>
          <Button
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-black dark:border dark:border-white/20 dark:hover:bg-white/10 dark:text-white"
            onClick={() => navigate("/user/courses")}
          >
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-700 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => navigate("/user/courses")}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {course.description}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="flex items-center gap-4">
                <Badge className="text-sm bg-emerald-600 dark:bg-white dark:text-black">
                  {course.progress}% Complete
                </Badge>
                {course.classroomAssigned && (
                  <Badge
                    variant="outline"
                    className="dark:border-white/20 dark:text-gray-200"
                  >
                    🏫 Classroom
                  </Badge>
                )}
              </div>
              <Progress
                value={course.progress}
                className="w-48 h-2 mt-2 dark:bg-white/10"
              />
            </div>
          </div>
        </div>

        {/* Faculty Info */}
        {course.faculty && (
          <Card className="mb-6 dark:bg-black dark:border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 dark:bg-transparent dark:border dark:border-white/20 p-3 rounded-full">
                  <User className="h-6 w-6 text-emerald-600 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Instructor
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {course.faculty.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.faculty.designation}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="h-3 w-3" />
                    {course.faculty.email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="dark:bg-black dark:border dark:border-white/10">
            <TabsTrigger
              value="modules"
              className="dark:text-gray-300 dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white"
            >
              📚 Modules
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="dark:text-gray-300 dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white"
            >
              📝 Assignments
            </TabsTrigger>
            <TabsTrigger
              value="sessions"
              className="dark:text-gray-300 dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white"
            >
              🎥 Live Sessions
            </TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, index) => {
                const completedCount = module.studyMaterials.filter(
                  (m) => m.completed
                ).length;
                const totalCount = module.studyMaterials.length;
                const moduleProgress =
                  totalCount > 0
                    ? Math.round((completedCount / totalCount) * 100)
                    : 0;

                return (
                  <Card key={module._id} className="dark:bg-black dark:border-white/10">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900 dark:text-white">
                            Module {index + 1}: {module.title}
                          </CardTitle>
                          <CardDescription className="text-gray-500 dark:text-gray-400">
                            {module.description}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="secondary"
                          className="shrink-0 ml-4 dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/20"
                        >
                          {moduleProgress}% Complete
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Check if there are study materials */}
                      {module.studyMaterials && module.studyMaterials.length > 0 ? (
                        <div className="space-y-3">
                          {module.studyMaterials.map((material) => (
                            <div
                              key={material._id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <Checkbox
                                  checked={material.completed}
                                  onCheckedChange={() =>
                                    handleMaterialToggle(
                                      module._id,
                                      material._id,
                                      material.completed
                                    )
                                  }
                                  disabled={updating}
                                  className="h-5 w-5 dark:border-white/40"
                                />
                                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                  {getMaterialIcon(material.type)}
                                  <span
                                    className={
                                      material.completed
                                        ? "line-through text-gray-500 dark:text-gray-500"
                                        : ""
                                    }
                                  >
                                    {material.title}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="text-xs dark:border-white/20 dark:text-gray-300"
                                  >
                                    {material.type}
                                  </Badge>
                                </div>
                              </div>
                              {material.url && (
                                <a
                                  href={material.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-600 hover:text-emerald-700 dark:text-white dark:hover:text-gray-300"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                              {material.completed && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* No study materials message */
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <FileQuestion className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                          <p className="text-gray-500 dark:text-gray-400 font-medium">
                            No study materials available
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            This module doesn't have any study materials yet.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No modules available
              </p>
            )}
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            {course.assignments && course.assignments.length > 0 ? (
              course.assignments.map((assignment) => (
                <Card key={assignment._id} className="dark:bg-black dark:border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-gray-900 dark:text-white">
                          {assignment.title}
                        </CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">
                          {assignment.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(assignment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      <div
                        className={`flex items-center gap-2 ${getAssignmentStatusColor(
                          assignment.status
                        )}`}
                      >
                        {assignment.status === "Completed" && (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        {assignment.status === "Pending" && (
                          <Clock className="h-4 w-4" />
                        )}
                        {assignment.status === "Submitted" && (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        Status: {assignment.status}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileQuestion className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No assignments yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Check back later for assignments.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Live Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            {course.liveSessions && course.liveSessions.length > 0 ? (
              course.liveSessions.map((session) => (
                <Card key={session._id} className="dark:bg-black dark:border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                          <PlayCircle className="h-5 w-5 text-emerald-600 dark:text-white" />
                          {session.topic}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="shrink-0 dark:border-white/20 dark:text-gray-200"
                      >
                        Live Session
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </div>
                      {session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline dark:text-white flex items-center gap-1"
                        >
                          Join Meeting
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No live sessions scheduled
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Check back later for upcoming sessions.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
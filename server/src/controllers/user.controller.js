import { Enrollment } from "../models/Enrollment.js";
import { Course } from "../models/Course.js";
import { StudyMaterial } from "../models/StudyMaterial.js";
import { MaterialProgress } from "../models/MaterialProgress.js";
import { Module } from "../models/Module.js";
import { Faculty } from "../models/Faculty.js";
import { Assignment } from "../models/Assignment.js";
import { LiveSession } from "../models/LiveSession.js";

export const getCourses = async (req, res) => {
  // Take logged user id from request
  const userId = req.user.userId;
  // Get enrollments for the User
  const enrollments = await Enrollment.find({ userId });

  // extracts course ids
  const courseIds = enrollments.map((enrollment) => enrollment.courseId);

  // fetch all courses in one query
  const courses = await Course.find({
    _id: { $in: courseIds },
  });

  const result = [];

  // get modules for each course
  for (const course of courses) {
    // get module of the course
    const modules = await Module.find({
      courseId: course._id,
    });

    // get module ids from modules
    const moduleIds = modules.map((module) => module._id);

    // get study materials for each modules
    const studyMaterials = await StudyMaterial.find({
      moduleId: { $in: moduleIds },
    });

    // total study materials
    const totalMaterials = studyMaterials.length;

    // get material ids
    const materialIds = studyMaterials.map((material) => material._id);

    // get completed materials
    const completedMaterials = await MaterialProgress.find({
      userId: userId,
      materialId: { $in: materialIds },
      completed: true,
    });

    // toal completed study materials
    const totalCompletedMaterials = completedMaterials.length;

    // progress calculation
    const progress =
      totalMaterials == 0
        ? 0
        : Math.round((totalCompletedMaterials / totalMaterials) * 100);

    // find enrollment
    const enrollment = enrollments.find(
      (e) => e.courseId.toString() == course._id.toString()
    );

    result.push({
      courseId: course._id,
      title: course.title,
      description: course.description,
      progress,
      classroomAssigned: enrollment.classroomAssigned,
    });
  }

  res.status(200).json({
    result,
  });
};
export const getCourseDetails = async (req, res) => {
  // Take logged user id from request
  const userId = req.user.userId;
  // get course id
  const { courseId } = req.params;

  // check student is enrolled
  const isEnrolled = await Enrollment.findOne({
    userId,
    courseId,
  });

  if (!isEnrolled) return res.status(403);

  // get the course
  const course = await Course.findById(courseId);

  // get the faculty
  const faculty = await Faculty.findOne({ courseId });

  // get the modules
  const modules = await Module.find({ courseId });

  // get module ids from modules
  const moduleIds = modules.map((module) => module._id);

  // get study materials
  const studyMaterials = await StudyMaterial.find({
    moduleId: { $in: moduleIds },
  });

  // total study materials
  const totalMaterials = studyMaterials.length;

  // get assignments
  const assignments = await Assignment.find({ courseId });

  // get live sessions
  const liveSessions = await LiveSession.find({ courseId });

  // get material ids
  const materialIds = studyMaterials.map((material) => material._id);

  // get completed materials
  const completedMaterials = await MaterialProgress.find({
    userId: userId,
    materialId: { $in: materialIds },
    completed: true,
  });

  // toal completed study materials
  const totalCompletedMaterials = completedMaterials.length;

  // progress calculation
  const progress =
    totalMaterials == 0
      ? 0
      : Math.round((totalCompletedMaterials / totalMaterials) * 100);

  //   // Get enrollments for the User
  //   const enrollments = await Enrollment.find({ userId });

  //   // find enrollment
  //   const enrollment = enrollments.find(
  //     (e) => e.courseId.toString() == course._id.toString()
  //   );

  //   const result = [];
  //   result.push(
  //     course,
  //     faculty,
  //     modules,
  //     studyMaterials,
  //     assignments,
  //     liveSessions,
  //     progress
  //   );

  res.status(200).json({
    course: {
      _id: course._id,
      title: course.title,
      description: course.description,
      progress,
      classroomAssigned: isEnrolled.classroomAssigned,
      faculty,
      modules: modules.map((module) => ({
        _id: module._id,
        title: module.title,
        description: module.description,
        order: module.order,

        studyMaterials: studyMaterials
          .filter(
            (material) => material.moduleId.toString() === module._id.toString()
          )
          .map((material) => {
            const isCompleted = completedMaterials.find(
              (m) => m.materialId.toString() === material._id.toString()
            );

            return {
              _id: material._id,
              title: material.title,
              type: material.type,
              url: material.url,
              completed: isCompleted ? true : false,
            };
          }),
      })),
      assignments,
      liveSessions,
    },
  });
};
export const toggleMaterialCompletion = async (req, res) => {
  try {
    // Take logged user id from request
    const userId = req.user.userId;
    // get study material id
    const { materialId } = req.params;

    // get material progress
    const progress = await MaterialProgress.findOne({
      userId,
      materialId,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Material progress not found",
      });
    }

    // toggle completion
    progress.completed = !progress.completed;

    // update completedat
    progress.completedAt = progress.completed ? new Date() : null;

    await progress.save();

    res.status(200).json({
      message: "Material status updated successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

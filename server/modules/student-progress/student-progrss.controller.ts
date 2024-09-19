import mongoose from "mongoose";
import StudentProgressModel from "./student-progress.model";

async function updateStudentProgress(
  studentId: mongoose.Types.ObjectId,
  courseId: mongoose.Types.ObjectId,
  chapterId: mongoose.Types.ObjectId
) {
  let studentProgress = await StudentProgressModel.findOne({
    studentId,
    courseId,
  });

  if (!studentProgress) {
    studentProgress = new StudentProgressModel({
      studentId,
      courseId,
      chapterProgress: [{ chapterId, completed: true }],
      overallProgress: 0,
    });
  } else {
    const chapter = studentProgress.chapterProgress.find((chap) =>
      chap.chapterId.equals(chapterId)
    );
    if (chapter) {
      chapter.completed = true;
    } else {
      studentProgress.chapterProgress.push({ chapterId, completed: true });
    }
  }

  studentProgress.overallProgress = calculateOverallProgress(
    studentProgress.chapterProgress
  );

  await studentProgress.save();
}

function calculateOverallProgress(
  chapterProgress: { completed: boolean }[]
): number {
  const completedChapters = chapterProgress.filter(
    (chap) => chap.completed
  ).length;
  return (completedChapters / chapterProgress.length) * 100;
}

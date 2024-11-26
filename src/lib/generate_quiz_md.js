"use server";

export async function generateQuizMarkdown(quizData, quizType) {
  let markdown = "# Quiz\n\n";
  if (quizType == "objective") {
    quizData.questions.forEach((q, index) => {
      markdown += `## Question ${index + 1}\n\n${q.question}\n\n`;
      markdown += `A. ${q.A}\n`;
      markdown += `B. ${q.B}\n`;
      markdown += `C. ${q.C}\n\n`;
      markdown += `**Correct Answer:** ${quizData.answers[index]}\n\n`;
    });
  } else {
    quizData.questions.forEach((q, index) => {
      markdown += `## Question ${index + 1}\n\n${q.question}\n\n`;
      markdown += `**Answer:** ${quizData.answers[index]}\n\n`;
    });
  }

  return markdown;
}

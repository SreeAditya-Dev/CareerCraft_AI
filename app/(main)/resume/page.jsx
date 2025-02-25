import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="min-h-screen text-white p-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container mx-auto">
        <ResumeBuilder initialContent={resume?.content} />
      </div>
    </div>
  );
}
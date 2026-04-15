import { OrganizerForm } from "@/components/layout/organizer-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-zinc-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="w-full max-w-2xl">
        <OrganizerForm />
      </div>
    </div>
  );
}

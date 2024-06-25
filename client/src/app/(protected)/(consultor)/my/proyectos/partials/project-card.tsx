import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface Props {
    title: string;
    description: string;
    progress: number;
}

export default function ProjectCard(
    {title, description, progress}: Props
) {
  return (
    <Card className="sm:p-0 w-80 overflow-hidden ">
      <CardHeader className="p-0">
        <Image
            src={"/images/cover/cover-01.png"}
            width={300}
            height={200}
            className="h-40 w-full object-cover"
            alt="project illustration"
        />
      </CardHeader>
      <CardContent className="p-2">
        <h3 className="text-title-md font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p className="text-body-sm text-gray-400 dark:text-gray-300">
          {description}
        </p>
      </CardContent>
      <CardFooter className="px-2 py-0 flex gap-2 text-xs items-center">
        <Progress value={progress} className="h-1 bg-neutral-300"/>
        <span>{progress}%</span>
      </CardFooter>
    </Card>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: number,
    title: string;
    description: string;
    progress: number;
}

export default function ProjectCard(
    {id, title, description, progress}: Props
) {
  return (
    <Link href={`/my/proyectos/${id}`}>
      <Card className="p-0 sm:p-0 w-80 h-70 overflow-hidden rounded-xl">
        <CardHeader className="p-0">
          <Image
              src={"/images/cover/cover-01.png"}
              width={320}
              height={200}
              className="h-40 w-full object-cover"
              alt="project illustration"
          />
        </CardHeader>
        <CardContent className="p-2">
          <h3 className="text-title-sm font-semibold text-black line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-ceu-azul line-clamp-2">
            {description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi reiciendis officiis, laborum error minus, provident et quis fuga in consequuntur dolor veniam odit aspernatur exercitationem dignissimos, distinctio voluptatem unde!
          </p>
        </CardContent>
        <CardFooter className="px-2 py-0 pb-1.5 flex flex-col gap-2 text-xs text-ceu-azul">
          <Progress value={progress} className="h-1 bg-neutral-300" indicatorClassname="bg-ceu-azul"/>
          <span className="self-start pl-1.5">{progress.toFixed(2)}% completado</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

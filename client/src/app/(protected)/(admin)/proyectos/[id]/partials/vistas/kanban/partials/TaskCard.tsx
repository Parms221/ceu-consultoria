"use client";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { ColumnId } from "../index";
import { cn } from "@/lib/utils";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";

export interface Task {
    id: UniqueIdentifier;
    columnId: ColumnId;
    content: string;
}

interface TaskCardProps {
    task: Task;
    isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
    type: TaskType;
    task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        } satisfies TaskDragData,
        attributes: {
            roleDescription: "Task",
        },
    });

    // const style = {
    //     transition,
    //     transform: CSS.Translate.toString(transform),
    // };

    const variants = cva("", {
        variants: {
            dragging: {
                over: "ring-2 opacity-30",
                overlay: "ring-2 ring-primary",
            },
        },
    });

    return (
        <Card
            ref={setNodeRef}
            // style={style}
            className={variants({
                dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
            })}
        >
            <CardContent className={cn("px-3 pt-3 flex flex-row pb-6 border-t-2 text-left whitespace-pre-wrap space-between text-black",
                task.columnId === TAREA_ESTADOS.por_hacer && "border-secondary",
                task.columnId === TAREA_ESTADOS.en_progreso && "border-orange-400",
                task.columnId === TAREA_ESTADOS.hecho && "border-green-600"
            )}>
                {/* <Button
                    variant={"ghost"}
                    {...attributes}
                    {...listeners}
                    className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
                >
                    <span className="sr-only">Mover tarea</span>
                    <GripVertical />
                </Button> */}
                {task.content}
            </CardContent>
        </Card>
    );
}
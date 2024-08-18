"use client";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { Calendar, Eye, GripVertical, Trash2Icon } from "lucide-react";
import { ColumnId } from "../index";
import { cn } from "@/lib/utils";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";
import { Tarea } from "@/types/proyecto/Tarea";
import { DeleteTask, FeedbackChat } from "../../lista/dialogs";
import NewTaskModal from "../../../forms/Tareas";
import { convertFromTareaToDTO } from "../../../forms/utils";
import { formatDateRange } from "@/lib/date-format";

export interface Task {
    id: UniqueIdentifier;
    columnId: ColumnId;
    content: Tarea;
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

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const variants = cva("relative", {
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
            style={style}
            className={
                variants({
                    dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
                })
            }
        >
            <header>
                <h2 className="font-semibold text-lg line-clamp-2 text-ceu-azul">{task.content.titulo}</h2>
            </header>
            <CardContent className={cn("py-3 flex flex-row border-t-2 text-left whitespace-pre-wrap space-between text-black",
                task.columnId === TAREA_ESTADOS.por_hacer && "border-secondary",
                task.columnId === TAREA_ESTADOS.en_progreso && "border-orange-400",
                task.columnId === TAREA_ESTADOS.hecho && "border-green-600"
            )}>
                <Button
                    variant={"ghost"}
                    {...attributes}
                    {...listeners}
                    className="p-1 text-secondary-foreground/50 -ml-2 cursor-grab absolute left-0 top-0 h-full"
                >
                    <span className="sr-only">Mover tarea</span>
                    <GripVertical />
                </Button>
                <div className="flex flex-col
                    [&>div>button]:px-2 [&>div>button]:py-1.5 [&>div>button]:h-fit
                ">
                    <div className="flex gap-1 items-center -mt-8 text-muted-foreground">
                        <i>
                            <Calendar className="h-4 w-4"/>
                        </i>
                        <span className="whitespace-pre-line text-sm">
                        {formatDateRange(task.content.fechaInicio, task.content.fechaFin)}
                        </span>
                    </div>
                    <p className="text-sm mt-2">{task.content.descripcion}</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                        <NewTaskModal task={convertFromTareaToDTO(task.content)} asEdit/>
                        <FeedbackChat 
                            tarea={task.content}
                        />
                        <DeleteTask 
                            tarea={task.content}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
"use client";

import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BoardColumn, BoardContainer } from "./partials/BoardColumn";
import {
    DndContext,
    type DragEndEvent,
    type DragOverEvent,
    DragOverlay,
    type DragStartEvent,
    useSensor,
    useSensors,
    Announcements,
    UniqueIdentifier,
    TouchSensor,
    MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { type Task, TaskCard } from "./partials/TaskCard";
import type { Column } from "./partials/BoardColumn";
import { hasDraggableData } from "./partials/utils";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import useHito from "@/hooks/Hito/useHito";

const defaultCols = [
    {
        id: TAREA_ESTADOS.por_hacer,
        title: "Por hacer",
    },
    {
        id: TAREA_ESTADOS.en_progreso,
        title: "En progreso",
    },
    {
        id: TAREA_ESTADOS.hecho, 
        title: "Hecho",
    },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];;

// const initialTasks: Task[] = [
//     {
//         id: "task1",
//         columnId: "done",
//         content: "Project initiation and planning",
//     },
//     {
//         id: "task2",
//         columnId: "done",
//         content: "Gather requirements from stakeholders",
//     },
//     {
//         id: "task3",
//         columnId: "done",
//         content: "Create wireframes and mockups",
//     },
//     {
//         id: "task4",
//         columnId: "in-progress",
//         content: "Develop homepage layout",
//     },
//     {
//         id: "task5",
//         columnId: "in-progress",
//         content: "Design color scheme and typography",
//     },
//     {
//         id: "task6",
//         columnId: "todo",
//         content: "Implement user authentication",
//     },
//     {
//         id: "task7",
//         columnId: "todo",
//         content: "Build contact us page",
//     },
//     {
//         id: "task8",
//         columnId: "todo",
//         content: "Create product catalog",
//     },
//     {
//         id: "task9",
//         columnId: "todo",
//         content: "Develop about us page",
//     },
//     {
//         id: "task10",
//         columnId: "todo",
//         content: "Optimize website for mobile devices",
//     },
//     {
//         id: "task11",
//         columnId: "todo",
//         content: "Integrate payment gateway",
//     },
//     {
//         id: "task12",
//         columnId: "todo",
//         content: "Perform testing and bug fixing",
//     },
//     {
//         id: "task13",
//         columnId: "todo",
//         content: "Launch website and deploy to server",
//     },
// ];
export default function VistaKanban() {
    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const { projectId, setSelectedHito, gptHitos } = useProjectDetail(); 

    const { getHitosQuery } = useHito();
    const { data: hitos, isLoading, isError } = getHitosQuery(projectId);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const initialTasks: Task[] = hitos?.flatMap(hito => hito.tareasDelHito.map(tarea => ({
        id: tarea.idTarea!,
        columnId: tarea.estado.idEstado,
        content: tarea.titulo,
    }))) ?? [];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    if (isLoading) return <div>Cargando...</div>

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >
            <BoardContainer>
                <SortableContext items={columnsId}>
                    {columns.map((col) => (
                        <BoardColumn
                            key={col.id}
                            column={col}
                            tasks={tasks.filter((task) => task.columnId === col.id)}
                        />
                    ))}
                </SortableContext>
            </BoardContainer>

            {"document" in window &&
                createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <BoardColumn
                                isOverlay
                                column={activeColumn}
                                tasks={tasks.filter(
                                    (task) => task.columnId === activeColumn.id
                                )}
                            />
                        )}
                        {activeTask && <TaskCard task={activeTask} isOverlay />}
                    </DragOverlay>,
                    document.body
                )}
        </DndContext>
    );

    function onDragStart(event: DragStartEvent) {
        if (!hasDraggableData(event.active)) return;
        const data = event.active.data.current;
        if (data?.type === "Column") {
            setActiveColumn(data.column);
            return;
        }

        if (data?.type === "Task") {
            setActiveTask(data.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (!hasDraggableData(active)) return;

        const activeData = active.data.current;

        if (activeId === overId) return;

        const isActiveAColumn = activeData?.type === "Column";
        if (!isActiveAColumn) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        if (!hasDraggableData(active) || !hasDraggableData(over)) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        const isActiveATask = activeData?.type === "Task";
        const isOverATask = overData?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);
                const activeTask = tasks[activeIndex];
                const overTask = tasks[overIndex];
                if (
                    activeTask &&
                    overTask &&
                    activeTask.columnId !== overTask.columnId
                ) {
                    activeTask.columnId = overTask.columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = overData?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const activeTask = tasks[activeIndex];
                if (activeTask) {
                    activeTask.columnId = overId as ColumnId;
                    return arrayMove(tasks, activeIndex, activeIndex);
                }
                return tasks;
            });
        }
    }
}
import React from "react";

export type Navigation = {
    href: string;
    icon: React.ComponentType;
    label: string;
    children?: {
        href: string;
        label: string;
        icon: React.ComponentType;
    }[];
}
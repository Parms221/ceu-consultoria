"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/form.context";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/ui/editor/toolbar.plugin";

export default function BasicProjectData() {
  const { form } = useProjectForm();

  return (
    <div>
      <FormField
        control={form.control}
        name="title"
        render={({ field, formState }) => (
          <FormItem>
            <FormControl>
              <input
                type="text"
                placeholder="Título del proyecto"
                autoComplete="off"
                className="w-full text-3xl font-semibold text-black focus-visible:outline-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <RichText />
    </div>
  );
}

const theme = {
  code: "editor-code",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  image: "editor-image",
  link: "editor-link",
  list: {
    listitem: "editor-listitem",
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
  },
  ltr: "ltr",
  paragraph: "editor-paragraph",
  placeholder: "editor-placeholder",
  quote: "editor-quote",
  rtl: "rtl",
  text: {
    bold: "font-bold",
    code: "editor-text-code",
    hashtag: "editor-text-hashtag",
    italic: "italic",
    overflowed: "editor-text-overflowed",
    strikethrough: "line-through",
    underline: "underline",
    underlineStrikethrough: "line-through underline",
  },
};

function onError(error: any) {
  console.error(error);
}

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: theme,
};

function Placeholder() {
  return (
    <div className="pointer-events-none absolute left-2.5 top-4 inline-block select-none overflow-hidden overflow-ellipsis text-bodydark">
      Descripción del proyecto...
    </div>
  );
}

function RichText() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="relative min-h-37.5 resize-none px-2.5 py-3.5 text-black outline-0" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

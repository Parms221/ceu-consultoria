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
import { defaultEditorTheme } from "@/components/ui/editor/theme";

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
                className="w-full rounded-md p-1 text-3xl font-semibold text-black hover:bg-bodydark/20 focus-visible:outline-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/*<RichText />*/}
    </div>
  );
}

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: defaultEditorTheme,
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
      <div className="mt-3 border p-1">
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

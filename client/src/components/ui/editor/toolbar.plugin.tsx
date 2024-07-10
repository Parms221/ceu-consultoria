/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";

import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  FontBoldIcon,
  FontItalicIcon,
  Link1Icon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { getSelectedNode, LowPriority } from "@/components/ui/editor/lib";
import { FloatingLinkEditor } from "@/components/ui/editor/floating-link-editor";
import { createPortal } from "react-dom";

function Divider() {
  return <div className="w-[1px] bg-boxdark/10" />;
}

export interface ToolBarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  active: boolean;
}

const ToolBarButton = React.forwardRef<HTMLButtonElement, ToolBarButtonProps>(
  ({ className, active, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        type={"button"}
        variant={"ghost"}
        size={"icon"}
        className={cn(active ? "bg-slate-100 text-black" : "", className)}
        {...props}
      ></Button>
    );
  },
);

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [isLink, setIsLink] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  let allSelectedEvents = [...selectedEventTypes];

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  const insertLink = useCallback(() => {
    console.log("aaaaasdasdasa");
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div className="flex" ref={toolbarRef}>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        active={isBold}
        aria-label="Format Bold"
      >
        <FontBoldIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        active={isItalic}
        aria-label="Format Italics"
      >
        <FontItalicIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        active={isUnderline}
        aria-label="Format Underline"
      >
        <UnderlineIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        active={isStrikethrough}
        aria-label="Format Strikethrough"
      >
        <StrikethroughIcon />
      </ToolBarButton>
      {/*<ToolBarButton*/}
      {/*  active={isLink}*/}
      {/*  onClick={insertLink}*/}
      {/*  aria-label="Insert Link"*/}
      {/*>*/}
      {/*  <Link1Icon />*/}
      {/*</ToolBarButton>*/}
      {/*{isLink &&*/}
      {/*  createPortal(<FloatingLinkEditor editor={editor} />, document.body)}*/}
      <Divider />
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        active={false}
        aria-label="Left Align"
      >
        <TextAlignLeftIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        active={false}
        aria-label="Center Align"
      >
        <TextAlignCenterIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        active={false}
        aria-label="Right Align"
      >
        <TextAlignRightIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        active={false}
        aria-label="Justify Align"
      >
        <TextAlignJustifyIcon />
      </ToolBarButton>
    </div>
  );
}

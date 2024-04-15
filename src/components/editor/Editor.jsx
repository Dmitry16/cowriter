import React, { useState } from 'react'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useEditor } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import { Box } from '@mui/material'
import MenuBar from './MenuBar'
import './styles.scss'

export const Editor = () => {
    const [content, setContent] = useState('');

    const CustomExtension = Extension.create({
        onUpdate: ({ editor }) => {
            console.log('CustomExtension:::editor:::', editor.getText());
        }
    });

    const extensions = [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        }),
        CustomExtension,
    ];

    const editor = useEditor({
        extensions: extensions,
        content: content,
    });

  return (
    <Box sx={{m: 2}}>
        <EditorProvider slotBefore={<MenuBar />} editor={editor} extensions={extensions} />
    </Box>
  );
};

export default Editor;

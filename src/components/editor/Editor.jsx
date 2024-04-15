import React, { useState, useEffect } from 'react'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useEditor } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import { debounce, set } from 'lodash'

import { Box } from '@mui/material'
import MenuBar from './MenuBar'
import './styles.scss'

export const Editor = () => {
    const [content, setContent] = useState('');

    const debouncedSave = debounce((content) => {
        setContent(content);
    }, 2000);

    // send content to API
    useEffect(() => {
        console.log('Saving content:', content);
    }, [content]);

    const CustomExtension = Extension.create({
        onUpdate: ({ editor }) => {
            // console.log('CustomExtension:::editor:::', editor.getText());
            // setContent(editor.getText());
            debouncedSave(editor.getText());
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
        content: '',
    });

  return (
    <Box sx={{m: 2}}>
        <EditorProvider slotBefore={<MenuBar />} editor={editor} extensions={extensions} />
    </Box>
  );
};

export default Editor;

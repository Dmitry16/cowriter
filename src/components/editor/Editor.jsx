import React, { useState, useEffect, useContext } from 'react';
import { debounce } from 'lodash';
import { Box, Typography } from '@mui/material';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './MenuBar';
import { CoWriterContext } from '../../context';
import { fetchOpenAI } from '../../api/openAI/fetchOpenAI';
import { editorDefaults } from '../../constants/editorDefaults';
import { splitLinesAndConvertTagsToReactComponents } from '../../utils/content';

import './styles.scss';

export const Editor = () => {
    const { state, setState } = useContext(CoWriterContext);
    const [content, setContent] = useState('');

    useEffect(() => {
        setState({
            ...state,
           firstEditorUpdate: true,
        });
    }, []); 

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
    ];

    const editor = useEditor({
        extensions: extensions,
        content: state.content,
        onFocus({ editor }) {             
            if (state.firstEditorUpdate && content === editorDefaults.content) {
                editor.commands.setContent('');
                setState({
                    ...state,
                    content: content,
                    firstEditorUpdate: false
                });
            }
        },
        onUpdate({ editor }) {
            debounce(() => {
                setContent(editor.getHTML() || '');
            }, 2000)(); 
        },
    });

    const { selectedGenre: genre, selectedTheme: theme, selectedStyle: style, enableAI } = state; 

    useEffect(() => {
        console.log('content:::', content);

        if (content === '' || state.firstEditorUpdate || state.content === content) {
            console.log('content is empty or firstEditorUpdate is true or state.content is equal to content');
            return;
        }

        const currentContent = editor.getHTML();

        setState({
            ...state,
            content: currentContent,
            files: state.files.map(file => {
                if (file.name === state.currentFile) {
                    return {
                        ...file,
                        content: currentContent,
                    };
                }
                return file;
            }),
        });

        localStorage.setItem('coWriterState', JSON.stringify(state));

        enableAI && fetchOpenAI(content, genre, theme, style)
            .then((response) => {
                setState({
                    ...state,
                    completions: response.choices[0].message.content.split('\n'),
                })
            })
            .catch((error) => {
                console.error('API error:', error);
            });
    }, [content]);

    useEffect(() => {
        if (state.content === content) {
            return;
        }
        editor?.commands.setContent(state.content);
    }, [state.content]);

    // open file
    useEffect(() => {
        if (state.currentFile === '') {
            return;
        }

        const file = state.files.find(file => file.name === state.currentFile);

        if (!file) {
            return;
        }

        editor?.commands.setContent(file.content);

        setState({
            ...state,
            content: file.content,
        });
 
    }, [state.currentFile]);

    if (!editor) {
        return null;
    };

    const stats = splitLinesAndConvertTagsToReactComponents(
        `file: <b>${state.currentFile}</b>, genre: <b>${state.selectedGenre}</b>, theme: <b>${state.selectedTheme}</b>, style: <b>${state.selectedStyle}</b>`
    );

  return (
    <Box sx={{m: 2}}>
        {stats}
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
    </Box>
  );
};

export default Editor;

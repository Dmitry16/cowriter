import React, { useState, useEffect, useContext } from 'react'

import { debounce, set } from 'lodash'
import { Box, Typography } from '@mui/material'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
// import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './MenuBar'
import { CoWriterContext } from '../../context'
import { fetchOpenAI } from '../../api/openAI/fetchOpenAI'
import './styles.scss'

export const Editor = () => {
    const { state, setState } = useContext(CoWriterContext);
    const [firstEditorUpdate, setFirstEditorUpdate] = useState(true);
    const [content, setContent] = useState('');

    // console.log('Editor:::state:::', state);

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
            if (firstEditorUpdate) {
                editor.commands.setContent('');
                setState({
                    ...state,
                    content: content,
                });
                setFirstEditorUpdate(false);
            }
        },
        onUpdate({ editor }) {
        //    console.log('Editor:::editor:::', editor.getText());
            //   setState({
            //     ...state,
            //     content: editor.getText(),
            //   });
            debounce(() => {
                setContent(editor.getText());
                // setState({
                //     ...state,
                //     content: editor.getText(),
                // });
            }, 2000)(); 
        },
    });

    const { selectedGenre: genre, selectedTheme: theme, selectedStyle: style, enableAI } = state; 

    useEffect(() => {
        if (content === '' || firstEditorUpdate || state.content === content) {
            return;
        }

        setState({
            ...state,
            content: editor.getText(),
        });

        // console.log('API response:', response);

        enableAI && fetchOpenAI(content, genre, theme, style)
            .then((response) => {
                // console.log('API response:', response);
                // setCompletion(response.choices[0].message.content);
                // setContent(response.choices[0].message.content);
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

        // console.log('Editor::UseEffect::state.content::', state.content);

        editor?.commands.setContent(state.content);

        // setState({
        //     ...state,
        //     content: content,
        // });

    }, [state.content]);

    if (!editor) {
        return null;
    };

  return (
    <Box sx={{m: 2}}>
        <Typography sx={{m:2}} variant="h5" component="h1" color="text.darkBlue">
            {`Genre: ${state.selectedGenre}, Theme: ${state.selectedTheme}, Style: ${state.selectedStyle}`}
        </Typography>
        {/* <MenuBar /> */}
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
    </Box>
  );
};

export default Editor;

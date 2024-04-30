import React, { useState, useEffect, useContext } from 'react'

import { debounce, set } from 'lodash'
import { Box, Typography } from '@mui/material'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useEditor } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './MenuBar'
import { CoWriterContext } from '../../context'
import { fetchOpenAI } from '../../api/openAI/fetchOpenAI'
import './styles.scss'

export const Editor = () => {
    const { state, setState } = useContext(CoWriterContext);

    console.log('Editor:::state:::', state);

    const { selectedGenre: genre, selectedTheme: theme, selectedStyle: style, text, enableAI } = state;
    const [content, setContent] = useState('text');
    // const [completion, setCompletion] = useState('');

    console.log('Editor:::content:::', content);

    const debouncedSave = debounce((content) => {
        // console.log('Debounced:::enableAI:::', state.enableAI);
        setContent(content);
    }, 2000);

    // console.log('CustomExtension:::completion:::', completion);

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
        content: "<p>Start writing...</p>"
    });

    useEffect(() => {
        console.log('useEffect::111::', content);

       if (state.text) {
            editor.commands.insertContent('Example Text')
            setContent(state.text);
       }
       
    }, []);

    useEffect(() => {
        
        if (!content) return;
        // if (!content || !state.enableAI) return;
        
        if (content) {
            console.log('useEffect::222::', content);
            setContent(content);
        }

        if (content && !state.enableAI) {
            console.log('useEffect::333::', content);

            setState({
                ...state,
                text: content,
            });
            return;
        };

        // setContent(content);

        // setState({
        //     ...state,
        //     // enableAI: enableAI,
        //     text: state.text + content,
        // });

        // console.log('Saving content:', content);

        // fetchOpenAI(content, genre, theme, style)
        //     .then((response) => {
        //         console.log('API response:', response);
        //         // setCompletion(response.choices[0].message.content);
        //         setState({
        //             ...state,
        //             completions: response.choices[0].message.content.split('.'),
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('API error:', error);
        //     });
        if (content && state.enableAI) {
            console.log('useEffect::444::', content);
            setState({
                ...state,
                completions: 'aaaaaaa sdfgsdf fsdgr. wrqtfwregf xxx dfgdfsg. wrtwertrew tyukik rtuuti.'.split('.'),
                // text: state.text + content,
            });
        };
    }, [content]);

    const editorContent = content;

  return (
    <Box sx={{m: 2}}>
        <Typography sx={{m:2}} variant="h5" component="h1" color="text.darkBlue">
            {`Genre: ${state.selectedGenre}, Theme: ${state.selectedTheme}, Style: ${state.selectedStyle}`}
        </Typography>
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={editorContent} />
    </Box>
  );
};

export default Editor;

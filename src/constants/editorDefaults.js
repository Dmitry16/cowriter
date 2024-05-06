export const editorDefaults = {
    value: '',
    selectedTab: 'genres',
    selectedGenre: 'story',
    selectedTheme: 'life',
    selectedStyle: 'Sarcastic',
    enableAI: false,
    content: '',
    currentFile: 'file1',
    files: [
        { name: 'file1', content: '', completions: [], completionsHistory: [] },
        { name: 'file2', content: 'file2 content', completions: [], completionsHistory: [] }, 
        { name: 'file3', content: 'file3 content', completions: [], completionsHistory: [] },
    ],
    selectedLanguage: 'en',
    selectedWordCount: '500',
    selectedGenre: 'story',
    defaultContent: "<p>Start writing...</p>",
};
// Path: src/state/index.js
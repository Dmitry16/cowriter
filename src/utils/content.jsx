import React from 'react';
import { Typography } from '@mui/material';

// formats the content string splitting it by new line and wrapping each chunk with Typography component
export const formatContent = content => {
    return content.split('\n').map((chunk, index) => {
        return (
            <Typography variant="h5" component="h1" color="text.darkBlue" sx={{m:2}} key={index}>
                {chunk}
            </Typography>
        );
    });
};

export const splitLinesAndConvertTagsToReactComponents = content => {    
    return content.split('\n').map((chunk, index) => {
        const formattedChunk = transformHtmlLikeTagsToReactComponents(chunk); // Use formatText function for each chunk
        return (
            <Typography variant="h5" component="h1" color="text.darkBlue" sx={{ m: 2 }} key={index}>
                {formattedChunk}
            </Typography>
        );
    });
};

// formats the normal string (not tamplate literal) text with HTML-like tags transforming them into React components 
function formatNormalStringText(text) {
  // Define a regular expression to match HTML-like tags
  const htmlTagRegex = /<(\w+)>((?:.|\n)*?)<\/\1>/g;

  // Replace HTML-like tags with React components
  return text.replace(htmlTagRegex, (match, tagName, innerText) => {
    // Check if the tagName is supported, you can extend this list as needed
    const supportedTags = ['b', 'strong', 'i', 'em', 'u'];
    if (supportedTags.includes(tagName)) {
      // Return the corresponding React component
      const TagComponent = tagName;
      return <TagComponent>{innerText}</TagComponent>;
    } else {
      // If the tag is not supported, return the original string
      return match;
    }
  });
}

// formats the tamplate literal strings text with HTML-like tags transforming them into React components 
// export function transformHtmlLikeTagsToReactComponents(text) {
// // Define a regular expression to match HTML-like tags
//     const htmlTagRegex = /<(\w+)>(.*?)<\/\1>/g;

//     // Replace HTML-like tags with React components
//     let result = [];
//     let lastIndex = 0;
//     let match;
//     while ((match = htmlTagRegex.exec(text)) !== null) {
//         const [fullMatch, tagName, innerText] = match;
//         const supportedTags = ['b', 'strong', 'i', 'em', 'u', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'div', 'span', 'br'];
//         if (supportedTags.includes(tagName)) {
//             result.push(text.substring(lastIndex, match.index));
//             const TagComponent = tagName;
//             result.push(<TagComponent key={result.length}>{innerText}</TagComponent>);
//         } else {
//             // If the tag is not supported, push the original string
//             result.push(fullMatch);
//         }
//         lastIndex = htmlTagRegex.lastIndex;
//     }
//     // Push any remaining plain text
//     result.push(text.substring(lastIndex));
  
//     return result;
// }

function transformHtmlLikeTagsToReactComponents(text) {
    // Define a regular expression to match HTML-like tags
    const htmlTagRegex = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

    // Replace HTML-like tags with React components
    let result = [];
    let lastIndex = 0;
    let match;
    while ((match = htmlTagRegex.exec(text)) !== null) {
        const [fullMatch, tagName, attributes, innerText] = match;
        const supportedTags = ['b', 'strong', 'i', 'em', 'u', 'a', 'span'];
        if (supportedTags.includes(tagName)) {
            // Push preceding plain text
            result.push(text.substring(lastIndex, match.index));
            // Push React component based on the tag
            if (tagName === 'a') {
                // Extract URL, target, and rel attributes
                const urlMatch = attributes.match(/href="([^"]*)"/);
                const targetMatch = attributes.match(/target="([^"]*)"/);
                const relMatch = attributes.match(/rel="([^"]*)"/);
                
                // Construct anchor tag component with extracted attributes
                result.push(
                    <a 
                        key={result.length} 
                        href={urlMatch ? urlMatch[1] : ''} 
                        target={targetMatch ? targetMatch[1] : '_blank'} 
                        rel={relMatch ? relMatch[1] : 'noreferrer'}
                    >
                        {innerText}
                    </a>
                );
            } else {
                // Push other supported tag components
                result.push(React.createElement(tagName, { key: result.length }, innerText));
            }
        } else {
            // If the tag is not supported, push the original string
            result.push(fullMatch);
        }
        lastIndex = htmlTagRegex.lastIndex;
    }
    // Push any remaining plain text
    result.push(text.substring(lastIndex));
  
    return result;
}

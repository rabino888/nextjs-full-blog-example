import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './post-content.module.css';
import PostHeader from './post-header';

PrismLight.registerLanguage('js', js);
PrismLight.registerLanguage('css', css);

function PostContent (props) {
    const fullImagePath = '/images/posts/' + props.details.image;
    const markdownComponents = {
        p: (info) => {
            const { node } = info;

            if (node.children[0].tagName === 'img'){
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }
            return <p>{info.children}</p>
        },
        code: (code) => {
            const { className, children } = code;
            const language = className.replace(/language-/,'');
            return <PrismLight style={atomDark} language={language} children={children[0]} />
        }
    };
    return (
        <article className={classes.content}>
            <PostHeader title={props.details.title} image={fullImagePath} />
            <ReactMarkdown components={markdownComponents}>{props.details.content}</ReactMarkdown>
        </article>
    );
}

export default PostContent;
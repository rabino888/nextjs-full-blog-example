import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPaths(){
    const postFiles = fs.readdirSync(postsDirectory);
    return postFiles;
}

export function getAllPosts(){
    const postFiles = getAllPaths();
    
    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    });

    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 :1 );

    return sortedPosts;
}

export function getFeaturedPosts(){
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);

    return featuredPosts;
}

export function getPostData(fileName){
    const filePath = path.join(postsDirectory, fileName);
    const postFile = fs.readFileSync(filePath, 'utf-8');
    const {data, content} = matter(postFile);

    const postSlug = fileName.replace(/\.md$/,''); // removes the file extension
    
    const postData = {
        slug: postSlug,
        ...data,
        content
    };
    return postData;
}
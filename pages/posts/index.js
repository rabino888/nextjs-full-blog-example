import { Fragment } from "react";
import Head from 'next/head';

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

// const DUMMY_POSTS = [
//     {
//         title: 'post 1',
//         image:'getting-started-nextjs.png',
//         slug:'getting-started-with-nextjs',
//         excerpt:'Something something PULA',
//         date:'2022-02-10'
//     },
//     {
//         title: 'post 2',
//         image:'getting-started-nextjs.png',
//         slug:'getting-started-with-nextjs2',
//         excerpt:'Something something PULA',
//         date:'2022-02-10'
//     },
//     {
//         title: 'post 3',
//         image:'getting-started-nextjs.png',
//         slug:'getting-started-with-nextjs3',
//         excerpt:'Something something PULA',
//         date:'2022-02-10'
//     },
//     {
//         title: 'post 4',
//         image:'getting-started-nextjs.png',
//         slug:'getting-started-with-nextjs4',
//         excerpt:'Something something PULA',
//         date:'2022-02-10'
//     }
// ];

function AllPostsPage(props) {
    return (
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta name='description' content='a list of all posts' />
            </Head>        
            <AllPosts posts={props.posts} />
        </Fragment>
    );
}

export default AllPostsPage;

export function getStaticProps(){
    const allPosts = getAllPosts();
    return {
        props: {
            posts: allPosts
        }
    }
}
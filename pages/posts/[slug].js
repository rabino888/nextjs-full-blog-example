import { Fragment } from "react";
import Head from 'next/head';

import PostContent from "../../components/posts/post-details/post-content";
import { getAllPaths, getPostData } from "../../lib/posts-util";

function PostDetailsPage(props){
    return (
        <Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.excerpt} />
            </Head>
            <PostContent details={props} />
        </Fragment>
    );
}

export default PostDetailsPage;

export async function getStaticProps(context) {
    const slug = context.params.slug;
    const postDetails = getPostData(slug + '.md');
    return {
        props: postDetails,
        revalidate: 600
    }
}

export async function getStaticPaths(){
    const fileNames = await getAllPaths();
    const paths = await fileNames.map(path => ({params: {slug: path.replace(/\.md$/,'')}}));
    return {
        paths: paths,
        fallback: false
    }
}
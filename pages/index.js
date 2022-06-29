import { Fragment } from "react";
import Head from 'next/head';

import FeaturedPosts from "../components/homepage/featured-posts";
import Hero from "../components/homepage/hero";
import { getFeaturedPosts } from "../lib/posts-util";


function HomePage(props) {
    const posts = props.posts;
    return (
        <Fragment>
            <Head>
                <title>Ravi's Ploooooog</title>
                <meta name='description' content='I am a web developer practising' />
            </Head>
            <Hero />
            <FeaturedPosts posts={posts} />
        </Fragment>
    );
}

export default HomePage;

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts();
    return {
        props: {
            posts: featuredPosts
        }
    }
}
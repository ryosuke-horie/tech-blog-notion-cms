import React from 'react';

type Props = {
    title: string;
    description: string;
    date: string;
    tags: string;
    slug: string;
}

const SinglePost = (props: Props) => {
    const { title, description, date, tags, slug } = props;

    return <div>{title}</div>
}

export default SinglePost;
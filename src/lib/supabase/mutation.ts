'use server';

import { randomUUID } from 'crypto';
import { supabaseServer } from '.';
import { revalidatePath } from 'next/cache';
// import { db } from '../db';
// import { likes, profiles, replies, tweets } from '../db/schema';
// import { eq } from 'drizzle-orm';

export const likeTweet = async ({
    tweetId,
    userId,
}: {
    tweetId: string;
    userId: string;
}) => {
    const { data, error } = await supabaseServer.from('likes').insert({
        id: randomUUID(),
        tweet_id: tweetId,
        user_id: userId,
    });

    revalidatePath('/');

    console.log({ data, error });
};

export const unlikeTweet = async ({
    tweetId,
    userId,
}: {
    tweetId: string;
    userId: string;
}) => {
    const { data, error } = await supabaseServer
        .from('likes')
        .delete()
        .eq('tweet_id', tweetId)
        .eq('user_id', userId);

    revalidatePath('/');

    console.log({ data, error });
};

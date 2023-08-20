import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/lib/supabase.types';

const ComposeTweet = () => {
    async function submitTweet(formData: FormData) {
        'use server';

        const tweet = formData.get('tweet');

        if (!tweet) return;

        const supabase = createServerComponentClient<Database>({
            cookies,
        });

        const { data: userData, error: userError } =
            await supabase.auth.getUser();

        if (userError) return;

        await supabase.from('tweets').insert({
            profile_id: userData.user.id,
            text: tweet.toString,
            id: randomUUID,
        });
    }

    return (
        <form action={submitTweet} className="flex flex-col w-full h-full">
            <input
                className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
                type="text"
                name="tweet"
                placeholder="What's happening?"
            />

            <div className="w-full justify-between items-center flex">
                <div></div>
                <div className="w-full max-w-[100px]">
                    <button
                        type="submit"
                        className="rounded-full bg-twitterColor px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ComposeTweet;

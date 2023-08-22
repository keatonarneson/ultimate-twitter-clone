import { BsChat, BsDot, BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { IoStatsChart, IoShareOutline } from 'react-icons/io5';
import ComposeTweet from './server-components/compose-tweet';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../lib/supabase.types';
import { revalidatePath } from 'next/cache';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getTweets } from '@/lib/supabase/getTweets';

dayjs.extend(relativeTime);

const Main = async () => {
    const res = await getTweets();

    return (
        <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
                Home
            </h1>
            <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
                <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
                <ComposeTweet />
            </div>
            <div className="w-full">
                {res?.error && <div>Something wrong with the server</div>}

                {res?.data &&
                    res.data.map((tweet, i) => (
                        <div
                            key={tweet.id}
                            className="border-b-[0.5px] py-4 px-6 flex space-x-4 border-gray-600 w-full"
                        >
                            <div>
                                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center w-full justify-between">
                                    <div className="flex items-center space-x-1 w-full">
                                        <div className="font-bold">
                                            {tweet.profiles.full_name ?? ''}
                                        </div>
                                        <div className="text-gray-500">
                                            @{tweet.profiles.username}
                                        </div>
                                        <div className="text-gray-500">
                                            <BsDot />
                                        </div>
                                        <div className="text-gray-500">
                                            {dayjs(tweet.created_at).fromNow()}
                                        </div>
                                    </div>
                                    <div>
                                        <BsThreeDots />
                                    </div>
                                </div>
                                <div className="text-white text-base">
                                    {tweet.text}
                                </div>
                                <div className="bg-slate-400 apsect-square w-full h-80 rounded-xl mt-2"></div>
                                <div className="flex items-center justify-start space-x-20 mt-2 w-full">
                                    <div className="rounded-full hover:bg-white/10 transition duration-200 p-2 cursor-pointer">
                                        <BsChat />
                                    </div>
                                    <div className="rounded-full hover:bg-white/10 transition duration-200 p-2 cursor-pointer">
                                        <AiOutlineRetweet />
                                    </div>
                                    <div className="rounded-full hover:bg-white/10 transition duration-200 p-2 cursor-pointer">
                                        <AiOutlineHeart />
                                    </div>
                                    <div className="rounded-full hover:bg-white/10 transition duration-200 p-2 cursor-pointer">
                                        <IoStatsChart />
                                    </div>
                                    <div className="rounded-full hover:bg-white/10 transition duration-200 p-2 cursor-pointer">
                                        <IoShareOutline />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default Main;

import { useRouter } from 'next/router'
import { useEffect, useRef, useState, Fragment } from 'react';
import Pusher from "pusher-js";

import ChatMessage from '../../components/ChatMessage';
import { PaperAirplaneIcon } from '@heroicons/react/solid';

import { getSession } from 'next-auth/client';

import ContentEditable from 'react-contenteditable'
import { useDispatch, useSelector } from 'react-redux';
import { channelSetActive, channelStartJoinChannel } from '../../actions/channels';
import React from 'react';

import { format } from 'date-fns'

function Room({ messagesBD }) {


    const dispatch = useDispatch()

    const [chats, setChats] = useState({});

    const { activeChannel, userChannels } = useSelector(state => state.channel);

    const messageToSendRef = useRef("");
    const scrollRef = useRef();

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // setChats(messagesBD);
        setChats(groupByDate(messagesBD));

    }, [messagesBD])

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
        console.log("raaa");
    }, [chats])

    useEffect(() => {
        if (userChannels.length > 0) {
            const channel = userChannels.find(channel => channel._id === id);
            dispatch(channelSetActive({
                channel
            }))
        }

    }, [id, userChannels])

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_KEY);
        const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
            cluster: "us2",
        });
        const channel = pusher.subscribe(`chat${id}`);

        channel.bind("chat-event", function (data) {
            const incChatDate = new Date(data.date)
            const dateKey = incChatDate.toDateString();

            setChats((prevState) => {
                if (Object.keys(prevState).length === 0 && prevState.constructor === Object) {
                    return {
                        [dateKey]: [data]
                    }
                } else {
                    return {
                        ...prevState,
                        [dateKey]: [...prevState[dateKey], data]
                    }
                }
            })
        });

        return () => {
            pusher.unsubscribe(`chat${id}`);
        };
    }, [id]);

    const handleChange = (e) => {
        if (messageToSendRef.current.length < 255) {
            messageToSendRef.current = e.target.value
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const msgToSend = messageToSendRef.current;
        const resp = await fetch('/api/pusher', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ message: msgToSend, channelId: id })
        })
        console.log(await resp.json());
    };

    const joinChannel = () => {
        dispatch(channelStartJoinChannel(id));
    }

    const groupByDate = (chatMessages) => {
        return chatMessages.reduce((acc, chat) => {
            const currentDate = new Date(chat.date);
            const date = currentDate.toDateString();
            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(chat)
            return acc;
        }, {});
    }

    return (
        <>
            {
                activeChannel?.channel.isMember ?
                    <>
                        <div className="px-10 md:px-20 py-5 flex-grow scrollbar-thin scrollbar-thumb-purple-black scrollbar-purple overflow-y-scroll "
                        >
                            {
                                chats && Object.keys(chats).map((item, id) => (
                                    <Fragment
                                        key={item}>

                                        <div className="flex items-center mb-4">
                                            <div className="bg-gris flex-grow h-px" ></div>
                                            <h1 className="text-gris text-sm mx-4">{format(new Date(item), 'MMMM dd, yyyy')}</h1>
                                            <div className="bg-gris flex-grow h-px"></div>
                                        </div>

                                        {
                                            chats[item] && chats[item].map(chat => (
                                                <div
                                                    key={chat._id}
                                                    ref={scrollRef}
                                                >
                                                    <ChatMessage
                                                        key={chat._id}
                                                        text={chat.text}
                                                        date={chat.date}
                                                        sender={chat.sender.username}
                                                        senderProfile={chat.sender.profile}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </Fragment>
                                ))
                            }
                        </div>
                        <div className="w-full px-20 pb-6 bottom-0">
                            <form className="relative w-full" onSubmit={handleSubmit}>
                                <div className="rounded-lg bg-blue-600 w-10 h-10 absolute top-2 right-2 flex items-center justify-center">
                                    <button type="submit">
                                        <PaperAirplaneIcon className="text-white transform rotate-90 h-6 w-6 " />
                                    </button>
                                </div>

                                <ContentEditable
                                    html={messageToSendRef.current}
                                    onChange={handleChange}
                                    className="rounded-lg py-4 pl-6 pr-12  break-all block overflow-hidden resize-none w-full bg-true-gray text-white" role="textbox"
                                />

                            </form>

                        </div>
                    </>

                    :
                    <div className="flex justify-center items-center flex-grow flex-col">
                        <img src="/images/chat2.png" className="max-w-sm" />
                        <button className=" border-2 border-blue-600 py-2 px-4 text-blue-600"
                            onClick={joinChannel}
                        >Join the Channel</button>
                    </div>

            }

        </>
    );
}
export default Room


export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const { id } = context.params;

    const res = await fetch(`${process.env.API_URL}/messages/getMessages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ channelId: id })
    });
    const messagesBD = await res.json();
    return {
        props: { messagesBD, session }, // will be passed to the page component as props
    }
}
import { PlusIcon, SearchIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import ChannelList from './ChannelList'
import NewChannelModal from './NewChannelModal';
import Profile from './Profile';

const Sidebar = () => {

    const [inputSearch, setInputSearch] = useState("");

    const handleChange = (e) => {
        setInputSearch(e.target.value)
    }
    return (
        <>
            <div className="hidden md:flex h-screen  flex-col w-80 bg-purple-mid text-white font-bold" >

                <div className="w-80 pl-8 pr-5 py-4 
                flex justify-between shadow-md items-center">
                    <h1 className="text-lg">Channels</h1>

                    <NewChannelModal />
                </div>

                <div className="pl-8 pt-5 pr-6 flex-grow scrollbar-thin scrollbar-thumb-purple-black scrollbar-purple-mid  overflow-y-auto">
                    <div className="relative rounded-lg mb-7">
                        <SearchIcon className="left-3 top-3.5 absolute w-5 h-5" />
                        <input
                            value={inputSearch}
                            onChange={handleChange}
                            className="placeholder-gris bg-true-gray py-3 rounded-lg w-full pl-10" placeholder="Search" />
                    </div>


                    <ChannelList searchTerm={inputSearch} />
                </div>
                <Profile />

            </div>
        </>



    );
}

export default Sidebar;
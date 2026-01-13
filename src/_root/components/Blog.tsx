
import { MdDeleteOutline, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useGetRecentBlogs} from '@/lib/react_query/querieAndMutation';
import Loader from '@/components/shared/Loader';
import { useNavigate } from 'react-router-dom';
import { appwriteConfig, databases, storage } from '@/lib/appwrite/config';

function Blog() {

    const { data: posts, isLoading: isPostLoading, isError: isErrorPosts} = useGetRecentBlogs();
    const navigate = useNavigate();
    const handleAddPost = () => {
        // Logic to navigate to AddArticle page
        navigate('/layout/add-blog');
    }
    const documents = posts?.documents ?? [];

    const handleDelete =  async (postId: string, imageId: string) => {
            // Logic to delete a post
             await storage.deleteFile({
                bucketId: appwriteConfig.storageId,
                fileId: imageId
            })

             await databases.deleteDocument({
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tablePostsId,
                documentId: postId,
            });
            console.log("Deleting post with ID:", postId);
        }
    

    if (isErrorPosts) {
        <div className='flex flex-col gap-8 justify-center items-center'>
            <MdSignalWifiStatusbarNotConnected size={100} />
            <p>verify your network</p>
        </div>
    }
    return (
        <div className='flex flex-col gap-8'>
            <h2 className='font-semibold text-2xl'>Blog</h2>
            <div className='w-full bg-gray-800 min-h-100 rounded-md p-4'>
                <div className='w-full min-h-80 grid grid-cols-4 p-4 gap-4'>
                    {isPostLoading && !posts ? <Loader /> :
                        documents.map((post: any) => (
                            <div className='w-full flex h-40'>
                                <div className='w-4/5 hover:scale-105 hover:border-2 transition-all  duration-300'>
                                    <div key={post.$id} className='relative flex flex-col gap-2 bg-gray-900 p-2 rounded-md mb-2 h-40'>
                                        <p className='absolute font-semibold top-25 left-5'>{post.title}</p>
                                        <p className='absolute top-30 left-10'>{post.excerpt}</p>
                                        <img className='w-full h-full  rounded-2xl' src={post.imageUrl} alt="" />
                                    </div>
                                </div>
                                <div className='w-1/5 flex flex-col items-center  gap-4'>
                                    <button onClick={() => handleDelete(post.$id, post.imageId)} className='bg-gray-800 text-white'><MdDeleteOutline size={20} /></button>
                                    <button className='bg-transparent text-white'><MdOutlineModeEdit size={20} /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full h-10 flex justify-end'>
                    <button onClick={handleAddPost} className='bg-gray-600 p-2 rounded-sm flex items-center gap-2'>Publier <IoMdAdd /></button>
                </div>
            </div>
        </div>
    )
}

export default Blog
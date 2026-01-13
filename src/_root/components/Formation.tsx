
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Calendar, MapPin, Clock, Users, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { useGetFormations } from '@/lib/react_query/querieAndMutation';
import Loader from '@/components/shared/Loader';
import { useNavigate } from 'react-router-dom';
import { formatInstagramDate } from '@/lib/utils';
import { appwriteConfig, databases } from '@/lib/appwrite/config';

function Formation() {
    const { data: upcomingEvents, isPending: isPendingEvents } = useGetFormations();
    const navigate = useNavigate();
    const getEventIcon = (type:any) => {
        switch (type) {
            case 'Salon': return BookOpen
            case 'Conférence': return Users
            case 'Atelier': return Users
            case 'Lancement': return BookOpen
            case 'Festival': return Users
            default: return Calendar
        }
    }

    const handleDelete =  async (postId: string) => {
           
    
             await databases.deleteDocument({
                databaseId: appwriteConfig.databasesId,
                collectionId: appwriteConfig.tableEventsId,
                documentId: postId,
            });
            console.log("Deleting post with ID:", postId);
        }
    

    const HandleAddFormations = () => {
        // Logic to handle adding formations
        navigate('/layout/add-events');
    }


    return (
        <div className='flex flex-col gap-8'>
            <h2 className='font-semibold text-2xl'>Formation</h2>
            <div className='w-full bg-gray-800 min-h-100 rounded-md space-y-10 p-4'>
                {isPendingEvents && !upcomingEvents ? (<Loader />) :
                    <div>
                        {
                            upcomingEvents?.documents.map((event:any, index:any) => {
                                const EventIcon = getEventIcon(event.type)
                                return (
                                    <div className='w-full flex h-40'>
                                        <div className="space-y-8 w-full">
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, x: -50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                                viewport={{ once: true }}
                                            >
                                                <Card className="bg-gray-300 border-gray-700 hover:scale-105 transition-transform duration-300">
                                                    <CardContent className="p-8">
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                                            {/* Icône et type */}
                                                            <div className="flex-shrink-0">
                                                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                                                                    <EventIcon className="text-gold" size={32} />
                                                                </div>
                                                            </div>

                                                            {/* Contenu principal */}
                                                            <div className="flex-1">
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                                                    <h3 className="text-xl font-bold text-gold mb-2 sm:mb-0">{event.title}</h3>
                                                                    <span className="text-sm px-3 py-1 bg-gold/10 text-gold rounded-full w-fit">
                                                                        {event.type}
                                                                    </span>
                                                                </div>

                                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                                                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                                                        <Calendar size={16} />
                                                                        <span>{formatInstagramDate(event.date)}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                                                        <Clock size={16} />
                                                                        <span>{event.time}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                                                        <MapPin size={16} />
                                                                        <span>{event.location}</span>
                                                                    </div>
                                                                </div>

                                                                <p className="text-muted-foreground leading-relaxed mb-6">
                                                                    {event.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>

                                        </div>
                                        <div className='w-1/5 flex flex-col items-center  gap-4'>
                                            <button onClick={() => handleDelete(event.$id)} className='bg-gray-800 text-white'><MdDeleteOutline size={20} /></button>
                                            <button className='bg-transparent text-white'><MdOutlineModeEdit size={20} /></button>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                }
            </div>
            <div className='w-full h-10 flex justify-end'>
                <button onClick={HandleAddFormations} className='bg-gray-600 p-2 rounded-sm flex items-center gap-2'>Publier <IoMdAdd /></button>
            </div>
        </div>
    )
}

export default Formation
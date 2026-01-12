
import { useCallback, useState } from 'react'
import {  type FileWithPath} from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import imgUploadfile from '@/assets/icons/file-upload.svg'
import { Button } from '@/components/ui/button'
import Loader from '@/components/shared/Loader'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string
}
const FileUploader = ({ fieldChange }: FileUploaderProps) => {

    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState('')
    const [isLoadingfile, setIsLoadingFile] = useState(true)

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [fieldChange])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] ,
            'video/*': ['.mp4', '.mov', '.avi', '.webm', '.mkv'],
        },
        
    } as any);

    return (
        <div {...(file.length === 0 ? getRootProps() : {})} className='flex rounded-xl h-100 flex-center flex-col bg-gray-700 cursor-pointer'>
            <input {...(file.length === 0 ? getInputProps() : {})} className='cursor-pointer' />
            {
                fileUrl ? (
                    <div className='h-80 resize-none bg-gray-700 rounded-xl flex flex-col justify-center  items-center pt-4'>
                        {isLoadingfile && (
                            <div className="absolute flex items-center justify-center">
                                <Loader />
                            </div>
                        )}
                        <div className='relative w-1/2 h-full flex justify-between items-center'>
                            <img onLoad={()=> setTimeout(()=> setIsLoadingFile(false),1000)} src={fileUrl} alt="file-upload" className='w-full h-full rounded-xl' />
                            <button onClick={() => {
                                setFile([])
                                setFileUrl('')
                            }} className='absolute cursor-pointer w-10 h-10 rounded-full bg-[rgba(255,255,255,0.46)] text-white top-8 right-8 flex justify-center items-center'>X</button>
                        </div>
                        <p className='text-white text-center'>{file[0]?.name}</p>

                    </div>
                ) :
                    (
                        <div className='min-h-70 resize-none bg-gray-700 rounded-xl flex flex-col justify-center items-center gap-4'>
                            <img src={imgUploadfile} alt="file-upload" width={96} />
                            <h3 className='text-xl text-white mb-2 mt-6'> Drag Photo here</h3>
                            <h3 className='text-gray-500'>
                                PNG,JPG,mp4
                            </h3>
                            <Button className='bg-gray-600'>
                                Select from computer
                            </Button>
                        </div>
                    )}
        </div>
    )
}

export default FileUploader
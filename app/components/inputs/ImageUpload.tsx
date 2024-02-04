'use client';
//npm i next-cloudinary
import { CldUploadWidget } from "next-cloudinary";
import {Cloudinary} from "@cloudinary/url-gen";

import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global { //declare global var for cloudinary
  var cloudinary: any
}

const uploadPreset = "rgzepcah";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    // const cld = new Cloudinary({cloud: {cloudName: 'dtayxnujl'}});
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    
    <CldUploadWidget onUpload={handleUpload} uploadPreset = "rgzepcah" 
      options={{ maxFiles: 1}}>
      {({ open }) => {
        return (
          <div onClick={() => open()} className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
            <TbPhotoPlus size={50}/>
            <div className="font-semibold text-lg"> Click to upload </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image fill  style={{ objectFit: 'cover'}}  src={value} alt="House" />
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
/////////////////////////////////////////////

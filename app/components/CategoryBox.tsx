'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter(); //specific categories ko click karne per us categori ki listing bas dikhe .
  const params = useSearchParams(); //click category assign new parameter in searchengine

  const handleClick = useCallback(() => {
    let currentQuery = {}; //define empty query 
    
    if (params) { //chek parameter bz can also be null.
      currentQuery = qs.parse(params.toString()); //crete an obj out of all curr parameter
      //when we click on category we do not want accedentally remove those all previous perameter.one we able to combine all of the perameter.
    }

    const updatedQuery: any = {
      ...currentQuery,//when click on categorybox that currlabel assign as a perameter in our URL
      category: label //add new categiry
    }

     //i want jese hi ek category select ki jaye  redirect to that catagory and remove all the catagory
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl ({ //this url genrate the news query 
      url: '/',
      query: updatedQuery
     }, {skipNull: true }); //filter out emty options

     router.push(url);

  }, [label, params, router]);

  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${selected? 'border-b-neutral-800' : 'border-transparent'}
    ${selected? 'text-neutral-800' : 'text-neutral-500'}
    `}>
    <Icon size={26} />
    <div className="font-medium text-sm ">
       {label}
    </div>
    </div>
);
}

export default CategoryBox ;
////////////////////////////////////////
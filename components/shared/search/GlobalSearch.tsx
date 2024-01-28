"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";


const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(query || "");
  const searchContainerRef = useRef(null)

  useEffect(() => {
  // checking if were clicking outside of the search container
  const handleOutsideClick = (event:any) =>{
    if(searchContainerRef.current &&  !searchContainerRef.current.
      // @ts-ignore
      contains(event.target)){
      setIsOpen(false)
      setSearch('')
    }
  }
  setIsOpen(false)
  document.addEventListener('click',handleOutsideClick)
  return () => {
    document.removeEventListener('click',handleOutsideClick)
  }
  }, [])
  

  useEffect(() => {
    // settimeout means that something will happen if we dont do anything at the selected time - 300 
    const delayDebounceFn = setTimeout(()=>{
      if(search){
        const newUrl = formUrlQuery({
          params:searchParams.toString(),
          key:"global",
          value:search
        })
        router.push(newUrl,{scroll:false})
      }else{
         if(query){
          const newUrl = removeKeysFromQuery({
            params:searchParams.toString(),
            keysToRemove:['global',"type"]
          })
          router.push(newUrl,{scroll:false})
         }
         
      }
    },300)
    return () => clearTimeout(delayDebounceFn)
  }, [search,pathname,router,searchParams,query])
  
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
      <div
        className="background-light800_darkgradient relative flex min-h-[56px] grow
        items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />

        <Input
          type="text"
          value={search}
          onChange={(e) =>{
            setSearch(e.target.value);
            if(!isOpen){
              setIsOpen(true)
            }
            if(e.target.value === "" && isOpen) setIsOpen(false)
          }}
          placeholder="search globally"
          className="paragraph-regular no-focus placeholder text-dark400_light800 background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult/>}
    </div>
  );
};

export default GlobalSearch;

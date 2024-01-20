import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp =(createdAt:Date):string => {
    const now = new Date();
    const timeDiffrence = now.getTime() - createdAt.getTime();

    const minute = 60*1000;
    const hour = 60*minute;
    const day = 24*hour;
    const week = 7*day;
    const month = 30*day;
    const year = 365*day


    if(timeDiffrence <minute) {
      const seconds =Math.floor(timeDiffrence/1000)
      return `${seconds} ${seconds=== 1 ? 'second' : 'seconds ago'}`

    }else if(timeDiffrence <hour) {
      const minutes = Math.floor(timeDiffrence/minute)
      return `${minutes} ${minutes=== 1 ? 'minute' : 'minutes ago'}`
    }else if(timeDiffrence <day) {
      const hours = Math.floor(timeDiffrence/hour)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    }else if(timeDiffrence<week){
      const days = Math.floor(timeDiffrence/day)
      return `${days} ${days === 1 ? 'day' : 'days'} ago` 
    }else if(timeDiffrence < month){
      const weeks = Math.floor(timeDiffrence/week)
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
    }else if(timeDiffrence < year){
      const months = Math.floor(timeDiffrence/month)
      return `${months} ${months === 1 ? 'month' : 'months'} ago`
    }else{
      const years = Math.floor(timeDiffrence/year)
      return `${years} ${years === 1 ? 'year' : 'years'} ago`
    }


    
}

export const formatAndDivideNumber = (num: number):string => {
  if(num>= 1000000){
    const formattedNum = (num/1000000).toFixed(1);
    return `${formattedNum}M`
  }else if(num>=1000){
    const formattedNum = (num/1000).toFixed(1);
    return `${formattedNum}K`
  }else{
    return num.toString();
  }
}

export const getJoinedDate = (date: Date): string =>{
  // Extract the month and year from the Date object
  const month = date.toLocaleString('default',{month:'long'});
  const year = date.getFullYear();

  // Create the Joined date string (e.g. "September 2023")
  const joinedDate = `${month} ${year}`

  return joinedDate;

}

interface UrlQueryParams{
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery =({params,key,value}:UrlQueryParams)=>{
  const currentUrl = qs.parse(params)

  currentUrl[key]= value

  return qs.stringifyUrl({
    url:window.location.pathname,
    query:currentUrl,

  },
    {skipNull:true})
}

interface RemoveUrlQueryParams{
  params: string;
 keysToRemove: string[];
}


export const removeKeysFromQuery =({params,keysToRemove}:RemoveUrlQueryParams)=>{
  const currentUrl = qs.parse(params)

  keysToRemove.forEach((key)=>{delete currentUrl[key]})

  return qs.stringifyUrl({
    url:window.location.pathname,
    query:currentUrl,

  },
    {skipNull:true})
}
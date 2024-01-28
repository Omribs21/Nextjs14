"use server";

import Answer from "../database/answer.model";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.typs";

const searchableTypes = ["user", "answer", "question", "tag"]

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };
    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
      { model: User, searchField: "name", type: "user" },
    ];

    const typeLower = type?.toLowerCase();
    if(!typeLower || !searchableTypes.includes(typeLower)){
        // search across everything
        for (const {model,type ,searchField} of modelsAndTypes){
            const queryResults = await model
            .find({[searchField]:regexQuery}).limit(2);

            results.push(
                ...queryResults.map((item)=>({
                    title:type === "answer" ? `Answers containing ${query}`
            : item[searchField],
            type,
            id: type === 'user'
            ?item.clerkId
            :type === 'answer'
                ?item.question
                :item._id
                })) )
        }
        return JSON.stringify(results)
    }else{
        // search in the specified model type
        const modelInfo = modelsAndTypes.find((item) => item.type === type)

        if(!modelInfo){
            throw new Error('invalid search type!')
        }

        const queryResults = await modelInfo.model.
        find({[modelInfo.searchField]:regexQuery}).limit(8)

        results = queryResults.map((item)=>(
            {title:type === "answer" ? `Answers containing ${query}`
            : item[modelInfo.searchField],
            type,
            id: type === 'user'
            ?item.clerkId
            :type === 'answer'
                ?item.question
                :item._id
             
        }))
    }
    return JSON.stringify(results)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

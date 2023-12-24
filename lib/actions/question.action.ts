"use server"

import { revalidatePath } from "next/cache";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateQuestionParams, GetQuestionsParams } from "./shared.typs";

export async function getQuestions(params:GetQuestionsParams){
    try {
        connectToDatabase();

        const questions = await Question.find({})
        .populate({path:'tags',model:Tag})
        .populate({path:'author',model:User})
        .sort({createdAt:-1})

        return {questions}
    } catch (error) {
        console.log(error)
        throw error        
    }
}


export async function createQuestion(params:CreateQuestionParams){

    try {
        connectToDatabase();

        const {title,content,tags,author,path} = params;
        // create the question
        const question = await Question.create({
            title,content,author
        })

        const tagDocuments =[];

        // create the tags or get them if they already exist
        for(const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                {name:{$regex: new RegExp(`^${tag}$`,"i")}},
                {$setOnInsert:{name:tag},$push:{question:question._id}},
                {upsert:true,new:true}
            )
            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id,{
            $push:{tags:{$each:tagDocuments}}
        })

        // create an interaction record for the users ask_question action
        // increment author's reputation

        revalidatePath(path)
    } catch (error) {
        
    }

}
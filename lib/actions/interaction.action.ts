"use server"

import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.typs";

export async function viewQuestions(params:ViewQuestionParams){
    try {
        await connectToDatabase()
           const{questionId,userId}= params 
        // update view count for the question
        await Question.findByIdAndUpdate(questionId,{$inc:{views:1}})

        if(userId){
            const existingInteraction = await Interaction.findOne({
                user: userId,
                action:'view',
                question:questionId,
            })
            if(existingInteraction){
                return console.log("user has already viewed")
            }

            // create a new interaction
            await Interaction.create({
                user: userId,
                action:'view',
                question:questionId, 
            })
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
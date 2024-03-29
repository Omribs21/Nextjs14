import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { IQuestion } from "@/lib/database/question.model";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page:searchParams.page ? +searchParams.page:1 ,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: IQuestion) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              // @ts-ignore
              tags={question.tags}
              // @ts-ignore
              author={question.author}
              // @ts-ignore
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Theres no Saved questions to show"
            description="Be the first to break the silence! 🚀 
  Ask a Question and kickstart the discussion. 
  our query could be the next big thing others learn from. Get involved!"
            link="/ask-question"
            LinkTitle="ask a question"
          />
        )}
      </div>
      <div className="mt-10">
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page:1}
        isNext={result.isNext}

        />

      </div>
    </>
  );
};
export default Page;

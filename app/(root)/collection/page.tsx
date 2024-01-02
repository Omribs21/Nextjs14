import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import { GetSavedQuestions} from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";

export default async function Home() {
    const {userId} = auth();
    if(!userId) return null;
  const result = await GetSavedQuestions({
    clerkId:userId
  });

  console.log(result.questions)

  return (
    <>
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question:any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
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
    </>
  );
}

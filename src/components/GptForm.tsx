import { useDispatch } from "react-redux";
import { TMDB_OPTIONS } from "../utils/constants";
import { client } from "../utils/openAI";
import { URLS } from "../utils/urls";
import { addGptSearchMovies } from "../features/movieSlice";

const GptForm = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
}) => {
  const dispatch = useDispatch();
  const searchGPTSearchMovies = async (movieTitle: string) => {
    const response = await fetch(
      URLS.SEARCH_MOVIE_BY_TITLE(movieTitle),
      TMDB_OPTIONS
    );
    const jsonData = await response.json();
    return jsonData;
  };

  const generateResult = async () => {
    try {
      const curatedPrompt = `I am looking for movie recommendations. Based on my preferences, suggest the top 5 movies that match the following criteria: ${searchQuery}. Please provide the titles of the top 5 movies, separated by commas without numbering`;

      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo", // ✅ Using GPT-3.5 Turbo
        messages: [{ role: "user", content: curatedPrompt }],
        temperature: 0.7, // Adjusts randomness
        max_tokens: 100, // Limit response length
      });
      const allMovies = response.choices[0].message.content?.split(",") ?? [];

      if (allMovies?.length > 0) {
        const gptPromises = allMovies?.map((movieTitle) =>
          searchGPTSearchMovies(movieTitle)
        );
        Promise.all(gptPromises).then((res) =>
          dispatch(addGptSearchMovies(res))
        );
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <form
        className="bg-black rounded-md grid grid-cols-12 m-auto justify-center items-center  gap-5 p-4 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Ask AI for better movie recommendation"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 rounded-md border-2 border-white text-white placeholder:text-amber-50 col-span-8"
        />
        <button
          className="cursor-pointer px-3 py-2 text-white font-semibold bg-[#E50914] rounded-md col-span-4"
          onClick={generateResult}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptForm;

// 1. Raaz (2002)
// 2. 1920 (2008)
// 3. Ek Thi Daayan (2013)
// 4. Alone (2015)
// 5. Stree (2018)

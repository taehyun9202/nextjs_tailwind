import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchResult from "../components/SearchResult";
import { API_KEY, CONTEXT_KEY } from "../keys";
import Response from "../Response";

function Search({ results }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <SearchResult results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  // for developing use, prevent wasting use of api key
  // save data into Response.js as object and set useDummyData to true
  const useDummyData = false;

  const startIndex = context.query.start || "0";
  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((res) => res.json());

  // after server has rendered, pass result to client
  return {
    props: {
      results: data,
    },
  };
}

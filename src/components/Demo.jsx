import { useState, useEffect } from "react";
import { copy, linkIcon, tick, loader } from "../assets";
import { useLazyGetSummaryQuery } from "../services/paragraph";

const Demo = () => {

  const [paragraph,setParagraph] = useState({
    url: '',
    summary: '',
  });

  const [getSummary, {error,isFetching}] = useLazyGetSummaryQuery();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {data} = await getSummary({paragraphUrl : paragraph.url});

    if(data?.url) {
      const newParagraph = {...paragraph,summary : data.summary}
      setParagraph(newParagraph)
      console.log(paragraph)
    }  
  };
  return (
    <section className="mt-16 w-full max-w-lg">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
           src={linkIcon}
           alt="link_icon"
           className="absolute left-0 my-3 ml-5 w-5"
          />
          <input 
            type='url'
            placeholder="Enter the url"
            value={paragraph.url}
            onChange={(e) => setParagraph({...paragraph,url: e.target.value})}
            required
            className="url_input peer ml-2"       
          />
          <button type="submit" className="submit_btn my-4 peer-focus:border-gray-700 peer-focus:text-gray-700">
            Sum
          </button>
        </form>
      </div>
    </section>
  );
};

export default Demo;

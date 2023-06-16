import { useState, useEffect } from "react";
import { copy, linkIcon, tick, loader } from "../assets";
import { useLazyGetSummaryQuery } from "../services/paragraph";

const Demo = () => {
  const [paragraph, setParagraph] = useState({
    url: "",
    summary: "",
  });

  const [allParagraphs, setAllParagraphs] = useState([]);

  useEffect(() => {
    const paragraphsFromLocalStorage = JSON.parse(
      localStorage.getItem("paragraphs")
    );

    if (paragraphsFromLocalStorage) {
      setAllParagraphs(paragraphsFromLocalStorage);
    }
  }, []);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ paragraphUrl: paragraph.url });

    if (data?.summary) {
      const newParagraph = { ...paragraph, summary: data.summary };
      const updatedParagraph = [newParagraph, ...allParagraphs];
      setParagraph(newParagraph);
      setAllParagraphs(updatedParagraph);

      localStorage.setItem("paragraphs", JSON.stringify(updatedParagraph));
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
            type="url"
            placeholder="Enter the url"
            value={paragraph.url}
            onChange={(e) =>
              setParagraph({ ...paragraph, url: e.target.value })
            }
            required
            className="url_input peer ml-2"
          />
          <button
            type="submit"
            className="submit_btn my-4 peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        <div className="flex flex-col w-full gap-2 max-h-60 overflow-y-auto">
          {allParagraphs.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setAllParagraphs(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_img"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader_icon"
              className="w-10 h-10 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-center text-black">
              Oppss!!Something has happened
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            paragraph.summary && (
              <div className="flex flex-col gap-3">
                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {paragraph.summary}
                </p>
              </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;

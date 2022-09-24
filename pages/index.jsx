import React, { useEffect, useState } from "react"
import Image from "next/image"
import axios from 'axios'
import Footer from '../components/Layout/Footer'
import CreatedPost from "../components/Post/CreatedPost"

export default function Home() {

  const [articles, setArticles] = useState([])
  const [search, setSearch] =useState("")
  const [queryState, setQueryState] = useState({
    state: "latest",
    keyword: search
  })

  useEffect(() => {
    getArticles(queryState.state, queryState.keyword)
  }, [queryState])

  async function getArticles(state, keyword) {
    console.log(state)
    let apiUrl = `https://4b880c9d-fec7-4b7a-824d-32c94510899f.mock.pstmn.io/article/list?limit=10&page=0&sort=${state}&query=${keyword}`
    console.log(apiUrl)
    const response = await axios.get(apiUrl)
    const articles = JSON.parse(JSON.stringify(response.data))
    setArticles(articles)
  }


  const getLatest = () => {
    setQueryState({
      state: "latest",
      keyword: articles.keyword
    })
  }

  const getTrending = () => {
    setQueryState({
      state: "trending",
      keywork: articles.keyword
    })
  }

  const searchKeywordHandler = (event) => {
    setSearch(event.target.value)
    searchKeyword({
      state: queryState.state,
      keyword: search
    })
    if(event.key == "Enter") {
      searchKeyword()
    }
  }

  const searchKeyword = () => {
    setQueryState({
      state: queryState.state,
      keyword: search
    })
  }

  return (
    <main className='w-full h-auto mx-auto'>
      <section className='pt-32 h-[420px] bg-[#F1F1F1] text-center'>
        <div className='text-3xl text-[#393939]'>Get started with Up-road</div>
        <div className='text-5xl text-[#000] font-semibold'>What are you looking up-to?</div>
        <div className="relative mt-12 w-[900px] mx-auto">
          <div className="absolute top-0 transform translate-y-1/2 left-4">
            <Image 
              src="/assets/Search-icon.svg"
              alt="Search"
              width={22}
              height={22}
            />
          </div>
          <div className="absolute top-0 transform translate-y-1 right-2">
            <button className="w-24 h-10 bg-[#000] text-[#fff] rounded-3xl border-2 border-[#fff] hover:text-[#000] hover:font-semibold hover:bg-[#fff] hover:border-[#000] duration-200" onClick={searchKeyword}>Search</button>
          </div>
          <input type="text" value={search} placeholder='Looking for a curation content' className="w-full h-12 rounded-3xl text-left pl-16 py-4 outline-none shadow" onChange={searchKeywordHandler} onKeyDown={searchKeywordHandler} />
        </div>
      </section>
      <section className="w-[900px] mt-12 mx-auto">
        <div className="flex justify-start items-center">
          <div className={`flex justify-center items-center px-4 py-1 border-b-[3px] border-transparent hover:cursor-pointer hover:bg-[#eee] ${queryState.state === "latest" ? "border-[#000]": null}`} onClick={getLatest}>
            <Image 
              src="/assets/Latest-icon.svg"
              alt="latest"
              width={20}
              height={20}
            />
            <span className="ml-2 text-lg">Latest</span>
          </div>
          <div className={`flex justify-center items-center px-2 py-1 border-b-[3px] border-transparent hover:cursor-pointer hover:bg-[#eee] ${queryState.state === "trending" ? "border-[#000]": null}`} onClick={getTrending}>
            <Image 
              src="/assets/Trending-icon.svg"
              alt="trending"
              width={20}
              height={20}
            />
            <span className="ml-2 text-lg">Trending</span>
          </div>
        </div>
      </section>
      <section className="w-[900px] mt-12 mx-auto">
        {
          articles.map((article, index) => {
            return (
              <div key={index}>
                <CreatedPost article={article} />
              </div>
            )
          })
        }
      </section>
      <Footer />
    </main>
  )
}


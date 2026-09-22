import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query';
import { useState } from 'react'; 

async function fetchPosts(page)
{
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  return res.json();
}

async function fetchInfinitePosts({ pageParam = 1 })
{
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pageParam}`
  );
  return res.json();
}

function PaginationAndInfiniteQueryExample()
{
  return (
    <div className="section">
      <h2>Pagination and Infinite Queries</h2>
      <p>
        Pagination and infinite queries allow you to fetch data in chunks or pages.
      </p>
      {/* <PaginationExample /> */}
      <InfiniteQueryExample />
    </div>
  );
}
    
function PaginationExample()
{
  const [page, setPage] = useState(1);

  const { 
    data: posts, 
    isLoading, 
    isFetching,
    isPlaceholderData  
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <div className="card">
      <h3>Pagination Example</h3>
      <p>
        This uses a normal query, but the page number is part of the query key.
      </p>

      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!posts || posts.length < 5}
        >
          Next Page
        </button>
      </div>

      <p>Current Page: {page}</p>

      {isLoading && <p>Loading...</p>}
      {isFetching && !isLoading && <p>Background Fetching...</p>}
      {isPlaceholderData && <p>Showing previous page while loading new one...</p>}


      {posts &&
        posts.map((post) => (
          <div key={post.id} className="card"> 
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
} 


function InfiniteQueryExample()
{
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['infinite-posts'],
    queryFn: fetchInfinitePosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1;
    }
  });

  return (
    <div className="card">
      <h3>Infinite Query Example</h3>
      <p>
        This loads one page at a time and appends the new results to the bottom.
      </p>

      {isLoading && <p>Loading...</p>}
      {isFetching && !isFetchingNextPage && <p>Background Fetching...</p>}

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post) => (
            <div key={post.id} className="card">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>

      {!hasNextPage && <p>No more posts to load.</p>}
    </div>
  );

}

export default PaginationAndInfiniteQueryExample;
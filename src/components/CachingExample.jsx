import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function PostList()
{
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: async () =>
    {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      return res.json();
    },
    staleTime: 1000 * 60,       // 1 minute
    gcTime: 1000 * 60 * 5,      // 5 minutes
    refetchOnWindowFocus: true, // Enable refetching on window focus
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Background Fetching...</p>}

      {data &&
        data.map((post) => (
          <div key={post.id} className="card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}

function CachingExample() {
  const [show, setShow] = useState(true); 
  const queryClient = useQueryClient();

  const invalidatePosts = () => {
    queryClient.invalidateQueries({ 
      queryKey: ['posts'] 
    });
  };

  return (
    <div className="section">
      <h2>3. Caching</h2>
      <p>Toggle this component on and off to see the caching behavior.</p>

      <button onClick={invalidatePosts}>Invalidate Query</button>

      <button onClick={() => setShow(!show)}>
        {show ? 'Unmount Component' : 'Mount Component'} 
      </button>

      {show && <PostList />}
    </div>
  );
}

export default CachingExample;
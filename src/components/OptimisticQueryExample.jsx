import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchPosts()
{
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  return res.json();
}

async function updatePostTitle({ id, title })
{
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ title })
  });

  if (!res.ok)
  {
    throw new Error('Failed to update post');
  }

  return res.json();
}

function OptimisticQueryExample()
{
  const queryClient = useQueryClient();       

  const { 
    data: posts, 
    isLoading,
    isFetching 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updatePostTitle,

    onMutate: async (updatedPost) =>
    {
      await queryClient.cancelQueries({ queryKey: ['posts'] }); 
      
      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (oldPosts = []) => {
        return oldPosts.map((post) =>
          post.id === updatedPost.id
            ? { ...post, title: updatedPost.title }
            : post
        );
      });

      return { previousPosts };
    },
    onError: (err, updatedPost, context) =>
    {
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
    onSettled: () =>
    {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  }); 

  function handleUpdatePost(post) {
    mutate(post);
  }

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="section">
      <h2>Optimistic Updates</h2>
      {isError && <p>Error updating post: {error.message}</p>}
      {posts?.map((post) => (
        <div className="card" key={post.id}>
          <p>{post.title}</p>
          <button
            disabled={isPending}
            onClick={() => handleUpdatePost({
              id: post.id,
              title: `${post.title} (updated)`
            })}
          >
            Update title
          </button>
        </div>
      ))}
      {isFetching && <p>Refreshing posts...</p>}
    </div>
  );
}

export default OptimisticQueryExample;

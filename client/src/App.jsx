import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_BOOK_BY_AUTHOR = gql`
  query GetBookByAuthor($author: String!) {
    getBookByAuthor(author: $author) {
      title
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_BOOK_BY_AUTHOR, {
    variables: { author: 'Kate Chopin' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>The title of the book is <q>
      {data?.getBookByAuthor.title || 'No book found'}</q>
    </div>
  );
}

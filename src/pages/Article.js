import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Article() {
  const { id } = useParams();
  const url = "http://localhost:3000/articles/" + id;
  const { data: article, isPending, error } = useFetch(url);
  const history = useHistory();

  useEffect(() => {
    // if it's not possible to fetch the data, show error and then redirect to homepage
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [error, history]);

  return (
    <div>
      {isPending && <div>Loading article...</div>}
      {error && <div>{error}</div>}
      {article && (
        <div>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
}

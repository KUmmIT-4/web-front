import { getJson } from "@/api/test";
import { useQuery } from "@tanstack/react-query";

export default function Test(){
  const query = useQuery({ queryKey: ['json-test'], queryFn: getJson, staleTime: 1000 * 60 });
  return (
    <>
    <h1>test page</h1>
    <p>this is test page</p>
      {(query.isLoading) ? <div>Loading...</div> :
        <pre>{JSON.stringify(query.data, null, 2)}</pre>
      }
      {(query.isError) ? <div>Error: {query.error.message}</div> : null}
    </>
  );
}
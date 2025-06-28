export async function getJson(){
  const uri = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetch(uri).then((res) => res.json());
  return data;
}
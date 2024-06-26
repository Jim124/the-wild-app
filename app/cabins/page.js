import Counter from '../components/Counter';

export default async function Page() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await res.json();
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Counter users={data} />
    </div>
  );
}

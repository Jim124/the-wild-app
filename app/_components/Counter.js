'use client';

import { useState } from 'react';

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(users);
  return (
    <div>
      <p>there are {users.length} people.</p>
      <button onClick={() => setCount((cur) => cur + 1)}>{count}</button>
    </div>
  );
}

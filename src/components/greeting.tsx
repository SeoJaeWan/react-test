import { useEffect, useState } from "react";

interface GreetingProps {
  name: string;
  userId?: number;
}

interface User {
  name: string;
  email: string;
}

const Greeting: React.FC<GreetingProps> = (props) => {
  const { name, userId } = props;

  const [count, setCount] = useState(0);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typocode.com/users/${userId}`
      );

      const data = await res.json();
      setUser(data);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {/*  */}
      <h1>{name}</h1>

      {/*  */}
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      <p>Count : {count}</p>

      {/*  */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>{user!.name}</p>
          <p>{user!.email}</p>
        </div>
      )}
    </div>
  );
};

export default Greeting;

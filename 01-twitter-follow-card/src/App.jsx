import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

const users = [
  { userName: 'midudev', name: 'Miguel Ángel Durán', initialIsFollowing: true },
  { userName: 'levelsio', name: 'Levelsio', initialIsFollowing: false },
  { userName: 'linus__torvalds', name: 'Linus Torvalds', initialIsFollowing: true },
];

export function App() {
  const format = (username) => `@${username}`;

  return <div className="App">
    {
      users.map(user => {
        const { userName, name, initialIsFollowing } = user;
        return (
          <TwitterFollowCard
            key={userName}
            username={userName}
            formatUserName={format}
            initialIsFollowing={initialIsFollowing}>
            {name}
          </TwitterFollowCard>
        );
      })
    }
  </div>;
}


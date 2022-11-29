import { GetStaticProps } from "next";
import Link from "next/link";

interface Event {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
}

interface Props {
  events: Event[];
}

const Home = ({ events }: Props) => {
  console.log(events);
  return (
    <ul>
      {events.map((event) => (
        <Link href={`/${event.id}`} key={event.id}>
          <li>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.location}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-8cf43-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformedEvents: Event[] = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }

  return {
    props: {
      events: transformedEvents,
    },
  };
};

export default Home;

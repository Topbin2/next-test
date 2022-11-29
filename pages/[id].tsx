import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

interface Event {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  event: Event;
}

const Detail: NextPage<Props> = ({ event }) => {
  return <div>{event.description}</div>;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const response = await fetch(
    "https://nextjs-8cf43-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformedData: Event[] = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    });
  }

  const paths = transformedData.map((data) => ({
    params: {
      id: data.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { id } = params!;
  const response = await fetch(
    `https://nextjs-8cf43-default-rtdb.firebaseio.com/events/${id}.json`
  );
  const data = await response.json();

  return {
    props: {
      event: data,
    },
  };
};

export default Detail;

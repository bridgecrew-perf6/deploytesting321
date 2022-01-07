import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import TimeAgo from "react-timeago";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";

export const ActivityTab = (props: {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(5);

  const { data: activityData, loading: activityDataLoading } = useQuery(
    GraphResolvers.queries.GET_ALL_ACTIVITY_OF_USER,
    {
      fetchPolicy: "network-only",
      // nextFetchPolicy: "cache-and-network",
    }
  );

  if (activityData) {
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = activityData.getAllActivityOfUser.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate: any = (pageNumber: any) => setcurrentPage(pageNumber);

    return (
      <>
        <Box my="6">
          {activityDataLoading ? (
            <Flex justify="center" align="center" minH="300px">
              <Spinner size="lg" color="poldit.100" />
            </Flex>
          ) : (
            <Box>
              {activityData?.getAllActivityOfUser?.length > 0
                ? currentPosts.map((activity: any, index: number) => (
                    <ActivityCard
                      key={index + activity.description}
                      activity={activity}
                    />
                  ))
                : "No Activity History Found !!!"}
            </Box>
          )}
        </Box>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={activityData.getAllActivityOfUser.length}
          paginate={paginate}
        ></Pagination>
      </>
    );
  }

  // GET_ALL_ACTIVITY_OF_USER

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <Box my="6">
      <h1>Please Wait</h1>
    </Box>
  );
};

interface ActivityCardProps {
  activity: {
    description: string;
    date: string;
    activityId: string;
    type: string;
    pollId: string;
  };
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  console.log(activity.pollId);
  return (
    <Box mb="6">
      <Link href={`/Polls/${activity.pollId}`}>
        <Box borderBottom="1px solid #d3d3d3" pb="1">
          <Box>
            <Text color="gray.800">
              {activity.description}
              <Text as="span" _hover={{ color: "blue.400" }} cursor="pointer">
                {activity.type}
              </Text>
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.600">
              <TimeAgo date={activity.date} live={false} />
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

//////////////////////////////Pagination

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav class="d-flex justify-content-center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

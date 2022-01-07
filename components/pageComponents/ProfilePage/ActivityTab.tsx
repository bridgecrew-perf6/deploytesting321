import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import TimeAgo from "react-timeago";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

export const ActivityTab = (props: {}) => {
  const [loading, setLoading] = useState(false);

  const { data: activityData, loading: activityDataLoading } = useQuery(
    GraphResolvers.queries.GET_ALL_ACTIVITY_OF_USER,
    {
      fetchPolicy: "network-only",
      // nextFetchPolicy: "cache-and-network",
    }
  );  
  console.log(activityData);

  // GET_ALL_ACTIVITY_OF_USER

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <Box my="6">
      {activityDataLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="lg" color="poldit.100" />
        </Flex>
      ) : (
        <Box>
          {activityData?.getAllActivityOfUser?.length > 0
            ? activityData?.getAllActivityOfUser?.map(
                (activity: any, index: number) => (
                  <ActivityCard
                    key={index + activity.description}
                    activity={activity}
                  />
                )
              )
            : "No Activity History Found !!!"}
        </Box>
      )}
    </Box>
  );
};

interface ActivityCardProps {
  activity: {
    description: string;
    date: string;
    activityId: string;
    type: string;
  };
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <Box mb="6">
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
    </Box>
  );
};

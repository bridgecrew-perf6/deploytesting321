import { Flex, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroller";

interface InfiniteScroller {
  loadMore: any;
  children: ReactNode;
  hasMoreItems: boolean | undefined;
  loaderKey: string;
}

const InfiniteScroller = ({
  children,
  loadMore,
  hasMoreItems,
  loaderKey,
}: InfiniteScroller) => {
  return (
    <InfiniteScroll
      pageStart={0}
      style={{ overflow: "hidden" }}
      loadMore={loadMore}
      loader={
        <Flex justify="center" align="center" key={loaderKey}>
          <Spinner size="lg" color="poldit.100" />
        </Flex>
      }
      hasMore={hasMoreItems}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScroller;

import React from "react";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  return (
    <div>
      Search Page
      <div>{router.query.searchVal}</div>
    </div>
  );
}

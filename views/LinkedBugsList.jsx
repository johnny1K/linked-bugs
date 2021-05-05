import "regenerator-runtime/runtime.js";
import React, { useEffect, useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { getLinkedBugs } from "./lib/getLinkedBugs";
import { head } from "./lib/getTableHeader";

const LinkedBugsList = () => {
  // toDo: use state to enable dynamic table
  const [useBugs, setUseBugs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBugs() {
      const bugs = await getLinkedBugs();
      setUseBugs(bugs);
      setIsLoading(false);
    }
    getBugs();
  }, []);

  const rows = Object.values(useBugs).map(
    ({ summary, created, assignee, status, priority }, index) => {
      return {
        key: `row-${index}`,
        cells: [
          {
            content: summary,
          },
          {
            content: created,
          },
          {
            content: assignee,
          },
          {
            content: status,
          },
          {
            content: priority,
          },
        ],
      };
    }
  );

  return (
    <DynamicTable
      head={head}
      rows={rows}
      isLoading={isLoading}
      loadingSpinnerSize="small"
      emptyView={"No linked bugs found."}
    />
  );
};

export default LinkedBugsList;

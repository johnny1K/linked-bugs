import "regenerator-runtime/runtime.js";
import React, { useEffect, useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { getLinkedBugs } from "./lib/getLinkedBugs";
import { head } from './lib/getTableHeader';

const LinkedBugsList = () => {
  // toDo: use state to enable dynamic table
  const [useBugRows, setUseBugRows] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBugs() {
      setUseBugRows(await getLinkedBugs());
      setIsLoading(false);
    }
    getBugs();
  }, []);

  // toDo: fix empty state
  const rows = Object.values(useBugRows).map(
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

  return <DynamicTable head={head} rows={rows} isLoading={isLoading} />;
};

export default LinkedBugsList;

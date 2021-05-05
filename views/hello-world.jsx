import "regenerator-runtime/runtime.js";
import React, { useEffect, useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { getLinkedBugs } from "./lib/getLinkedBugs";

const createHead = () => {
  return {
    cells: [
      {
        key: "summary",
        content: "summary",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "created",
        content: "created",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "assignee",
        content: "assignee",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "status",
        content: "status",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "priority",
        content: "priority",
        shouldTruncate: true,
        isSortable: true,
      },
    ],
  };
};

const head = createHead();

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

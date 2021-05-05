import React, { useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";

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

// toDo: useEffect vs. receiving props
// a loading state would be nice too :)
const LinkedBugsList = (linkedBugDetails) => {
  // toDo: use state to enable dynamic table
  const [useBugs, setUseBugs] = useState(linkedBugDetails);

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

  return rows.length > 0 ? (
    <DynamicTable head={head} rows={rows} />
  ) : (
    <div>Loading or there are no linked bugs... :)</div>
  );
};

export default LinkedBugsList;
